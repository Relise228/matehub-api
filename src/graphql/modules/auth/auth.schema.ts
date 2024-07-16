import gql from "graphql-tag"

export default gql`
  type Mutation {
    signup(signupInput: SignUpInput!): TokenData
    login(username: String!, password: String!): TokenData
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String! @constraint(minLength: 6)
    confirmPassword: String! @constraint(minLength: 6)
  }

  type TokenData {
    token: String!
  }
`
