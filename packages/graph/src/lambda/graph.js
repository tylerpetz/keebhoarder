const { ApolloServer } = require("apollo-server-lambda");
const { schema } = require('../schema');
const { mocks } = require('../mocks');
const { createStore } = require('../utils');
const { createContext } = require('../context');
const { resolvers } = require('../resolvers');
const TrackerAPI = require('../datasources/tracker');

// set up any dataSources our resolvers need
const dataSources = () => ({
  trackerAPI: new TrackerAPI()
});

// creates a sequelize connection once. NOT for every request
const { PrismaClient } = require('@prisma/client')
const store = new PrismaClient()

const server = new ApolloServer({
  schema,
  tracing: true,
  resolvers,
  context: createContext,
  engine: {
    debugPrintReports: true
  }
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀 app running at ${url}`)
  });

