import jwt from "jsonwebtoken"
import * as z from "zod"
import { TOKEN_AGE, TOKEN_TYPE } from "./consts"

export type AuthContext = {
  accessKey?: AccessKey
  token?: string
}

export const UserAccessKeyValidator = z.object({
  type: z.literal(TOKEN_TYPE.USER),
  userId: z.string(),
})

export type Roles = keyof typeof TOKEN_TYPE
export type UserAccessKey = z.infer<typeof UserAccessKeyValidator>
export type AccessKey = UserAccessKey

export const parseToken = async (
  token: string
): Promise<AccessKey | undefined> => {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string, {
    maxAge: TOKEN_AGE,
  })

  let accessKey: AccessKey | undefined

  const userAccessKeyResult = UserAccessKeyValidator.safeParse(payload)

  if (userAccessKeyResult.success) {
    accessKey = userAccessKeyResult.data
  }

  return accessKey
}
