import "dotenv/config"
import { ApolloServer } from "@apollo/server"
import { createApplication } from "graphql-modules"
import { authModule, userModule } from "./graphql/modules"
import { startStandaloneServer } from "@apollo/server/standalone"
import { createApollo4QueryValidationPlugin } from "graphql-constraint-directive/apollo4"
import mongoose from "mongoose"
import { MONGO_URI } from "./utils/consts"
import { authContextMiddleware } from "./graphql/middlewares/authorization.context"
import { directivesModule } from "./graphql/modules/directives"
import { authDirective } from "./graphql/modules/directives/auth.directive"

const application = createApplication({
  modules: [directivesModule, userModule, authModule],
})

const schema = authDirective(application.createSchemaForApollo())

const plugins = [createApollo4QueryValidationPlugin()]

const server = new ApolloServer({
  schema,
  plugins,
})

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: authContextMiddleware,
    listen: { port: 8080 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}

mongoose
  .connect(MONGO_URI, {
    dbName: process.env.MONGO_DB,
  })
  .then((result) => {
    console.log("Connected To DB 🚀")
    startServer()
  })
  .catch((err) => {
    console.log(err)
  })
