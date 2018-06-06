const { ApolloServer, gql } = require('apollo-server');
const { registerServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
import typeDefs from './schema';
import resolvers from './resolvers';


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});