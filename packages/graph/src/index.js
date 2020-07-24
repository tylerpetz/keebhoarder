const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { mocks } = require('./mocks');

const server = new ApolloServer({
  typeDefs,
  mocks: mocks
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀 app running at ${url}`)
  });
