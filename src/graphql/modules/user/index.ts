import { createModule, gql } from "graphql-modules"
import userSchema from "./user.schema"
import { userResolvers } from "./user.resolver"

export const userModule = createModule({
  id: "user",
  dirname: __dirname,
  typeDefs: [userSchema],
  resolvers: userResolvers,
})
