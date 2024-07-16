import { ContextFunction } from "@apollo/server"
import { GraphQLError } from "graphql"
import { IncomingMessage, ServerResponse } from "http"
import { AuthContext, parseToken } from "../../utils/authorization"
import { STATUS_CODES } from "../../utils/consts"

type ContextMiddlewareType = ContextFunction<
  [
    {
      req: IncomingMessage
      res: ServerResponse
    }
  ],
  AuthContext
>

export const authContextMiddleware: ContextMiddlewareType = async ({
  req,
}): Promise<AuthContext> => {
  let token = <string>(
    (req.headers["authorization"] || req.headers["Authorization"])
  )

  if (!token) {
    return {}
  }

  token = token.split(" ")[1]

  const accessKey = await parseToken(token).catch((e) => {
    throw new GraphQLError(e.message, {
      extensions: {
        code: STATUS_CODES.UNAUTHORIZED,
        http: { status: STATUS_CODES.UNAUTHORIZED },
      },
    })
  })

  return {
    accessKey,
    token,
  }
}
