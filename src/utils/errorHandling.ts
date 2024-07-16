import { GraphQLError } from "graphql"
import { STATUS_CODES } from "./consts"

export const checkError = (
  isError: boolean,
  errorMessage: string,
  code = STATUS_CODES.BAD_REQUEST
) => {
  if (isError) {
    throw new GraphQLError(errorMessage, {
      extensions: { code, http: { status: code } },
    })
  }
}
