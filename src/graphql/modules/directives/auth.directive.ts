import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql"
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils"
import { Roles } from "../../../utils/authorization"
import { STATUS_CODES } from "../../../utils/consts"

interface AuthDirectiveType {
  requires: Roles[]
}

export const authDirective = (schema: GraphQLSchema): GraphQLSchema => {
  const directiveName = "auth"
  const typeDirectiveArgumentMaps: Record<string, AuthDirectiveType> = {}

  return mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const authDirective = getDirective(
        schema,
        type,
        directiveName
      )?.[0] as AuthDirectiveType
      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective
      }
      return undefined
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      let isFieldRequireAccess = true
      let authDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (!authDirective) {
        authDirective = typeDirectiveArgumentMaps[typeName]
        isFieldRequireAccess = false
      }

      if (authDirective) {
        const { requires } = authDirective
        if (requires) {
          const { resolve = defaultFieldResolver } = fieldConfig

          return {
            ...fieldConfig,
            resolve: (source, args, context, info) => {
              const accessKeyType = context.accessKey?.type

              if (!accessKeyType) {
                throw new GraphQLError("Unauthorized", {
                  extensions: {
                    code: STATUS_CODES.UNAUTHORIZED,
                    http: { status: STATUS_CODES.UNAUTHORIZED },
                  },
                })
              }

              if (
                !requires.some(
                  (type: string) =>
                    type.toLowerCase() === accessKeyType.toLowerCase()
                )
              ) {
                const errorMessage =
                  "You do not have access to " +
                  (isFieldRequireAccess ? _fieldName : typeName)
                throw new GraphQLError(errorMessage, {
                  extensions: {
                    code: STATUS_CODES.FORBIDDEN,
                    http: { status: STATUS_CODES.FORBIDDEN },
                  },
                })
              }

              return resolve(source, args, context, info)
            },
          }
        }
      }
    },
  })
}
