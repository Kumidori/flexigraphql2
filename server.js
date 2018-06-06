const { ApolloServer, gql } = require('apollo-server');
const { registerServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
import typeDefs from './schema';
import resolvers from './resolvers';

const app = express();
const path = '/graphql'
app.options('*', cors())
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
registerServer({ server, app, path});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});