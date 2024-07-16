import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { IRole, Role, User } from "../../../models"
import { AuthModule } from "./__generated-types/module-types"
import { GraphQLError } from "graphql"
import { checkError } from "../../../utils/errorHandling"
import { STATUS_CODES, TOKEN_AGE, TOKEN_TYPE } from "../../../utils/consts"

export const authResolvers: AuthModule.Resolvers = {
  Mutation: {
    signup: async (_, { signupInput }) => {
      const { email, username, password, confirmPassword } = signupInput

      const existingUsername = await User.exists({ username })
      const existingEmail = await User.exists({ email })

      checkError(
        Boolean(existingUsername),
        "User with such username already exist."
      )
      checkError(Boolean(existingEmail), "User with such email already exist.")
      checkError(password !== confirmPassword, "Password is not match.")

      const hashedPw = await bcrypt.hash(password, 12)

      const userRole = await Role.findOne({ name: TOKEN_TYPE.USER })

      checkError(!userRole, "Can`t create user.")

      const user = new User({
        email,
        username,
        password: hashedPw,
        role: userRole,
        registrationCompleted: false,
      })

      const savedUser = await user.save()

      const token = jwt.sign(
        { type: TOKEN_TYPE.USER, userId: savedUser._id.toString() },
        process.env.JWT_SECRET as string,
        {
          expiresIn: TOKEN_AGE,
        }
      )

      return {
        token,
      }
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username }).populate<{ role: IRole }>(
        "role"
      )

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new GraphQLError("Invalid Credentials", {
          extensions: {
            code: STATUS_CODES.BAD_REQUEST,
            http: { status: STATUS_CODES.BAD_REQUEST },
          },
        })
      }

      const isRoleLoginAllowed = user.role.permissions.find(
        (perm) => perm.name === "login"
      )?.value

      if (!isRoleLoginAllowed) {
        throw new GraphQLError("Login is restricted", {
          extensions: {
            code: STATUS_CODES.NOT_ALLOWED,
            http: { status: STATUS_CODES.NOT_ALLOWED },
          },
        })
      }

      const token = jwt.sign(
        {
          type: user.role.name,
          userId: user._id.toString(),
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7h",
        }
      )

      return {
        token,
      }
    },
  },
}
