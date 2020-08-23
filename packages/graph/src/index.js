const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { mocks } = require('./mocks');
const { resolvers } = require('./resolvers');
const UserAPI = require('./datasources/user');

const { createStore } = require('./utils');
// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  userAPI: new UserAPI({ store }),
});
const server = new ApolloServer({
  typeDefs,
  mocks: mocks
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀 app running at ${url}`)
  });
