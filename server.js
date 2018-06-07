const { ApolloServer, gql } = require('apollo-server');
const { registerServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
import typeDefs from './schema';
import resolvers from './resolvers';

const app = express();
app.options('*', cors())
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
registerServer({ server, app});
const options = {
    http:{
        port:"80",
        path:'/graphql'
    }
}
server.listen(options).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});