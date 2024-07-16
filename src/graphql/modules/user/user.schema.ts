import gql from "graphql-tag"

export default gql`
  type Query {
    getUser: User! @auth(requires: [USER])
  }

  type Mutation {
    checkUsernameIsAvailable(username: String!): UsernameAvailability!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    registrationCompleted: Boolean
  }

  type UsernameAvailability {
    isAvailable: Boolean!
  }
`
