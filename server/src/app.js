import { ApolloServer } from 'apollo-server'
import typeDefs from './graphql/schema/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'
import { getUserFromAuthHeader } from './middlewares/auth.js'
import db from './models/index.js'
import config from './config/index.js'

export async function createServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req.headers.authorization || ''
      const user = await getUserFromAuthHeader(auth).catch(() => null)
      return { user, db }
    },
  })

  return server
}

export async function startServer() {
  const server = await createServer()
  await db.sequelize.authenticate()
  console.log('Database connected')
  await server.listen({ port: config.app.port })
  console.log(`GraphQL server ready at http://localhost:${config.app.port}`)
}
