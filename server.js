//npm install apollo-server@beta graphql --save
const { ApolloServer, gql } = require('apollo-server');
//npm install axios--save
const axios = require('axios');

const typeDefs = gql`
type Query{
    
}
`;

const resolvers = {
    Query: {
        
        
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});