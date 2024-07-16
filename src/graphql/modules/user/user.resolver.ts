import { IRole, User } from "../../../models"
import { STATUS_CODES } from "../../../utils/consts"
import { checkError } from "../../../utils/errorHandling"
import { UserModule } from "./__generated-types/module-types"
import { GraphQLError } from "graphql"

export const userResolvers: UserModule.Resolvers = {
  Query: {
    getUser: async (_, args, { accessKey }) => {
      const userId = accessKey?.userId

      const user = await User.findById(userId)

      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: STATUS_CODES.BAD_REQUEST,
            http: { status: STATUS_CODES.BAD_REQUEST },
          },
        })
      }

      return user
    },
  },
  Mutation: {
    checkUsernameIsAvailable: async (_, { username }) => {
      checkError(!username, "Username is required")

      const isUsernameExist = await User.exists({ username })

      return { isAvailable: !isUsernameExist }
    },
  },
}
