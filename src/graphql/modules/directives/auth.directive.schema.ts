import gql from "graphql-tag"

export default gql`
  directive @auth(requires: [AccessKey]) on OBJECT | FIELD_DEFINITION

  enum AccessKey {
    USER
  }
`
