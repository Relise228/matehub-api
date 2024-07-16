import { constraintDirectiveTypeDefs } from "graphql-constraint-directive/apollo4"
import { createModule } from "graphql-modules"
import gql from "graphql-tag"
import { authResolvers } from "./auth.resolver"
import authSchema from "./auth.schema"

export const authModule = createModule({
  id: "auth",
  resolvers: authResolvers,
  dirname: __dirname,
  typeDefs: [
    authSchema,
    gql`
      ${constraintDirectiveTypeDefs}
    `,
  ],
})
