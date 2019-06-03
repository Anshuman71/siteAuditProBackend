import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './schema'

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.

// const server = new ApolloServer({ typeDefs, resolvers })

export default context => new ApolloServer({ typeDefs, resolvers, context })
