import { createModule } from "graphql-modules"
import gql from "graphql-tag"
import { constraintDirectiveTypeDefs } from "graphql-constraint-directive/apollo4"
import authDirectiveSchema from "./auth.directive.schema"

export const directivesModule = createModule({
  id: "directives",
  resolvers: [],
  dirname: __dirname,
  typeDefs: [
    authDirectiveSchema,
    gql`
      ${constraintDirectiveTypeDefs}
    `,
  ],
})
