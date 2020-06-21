const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    deliveryStatus: (_, { id, courierCode }, { dataSources }) =>
      dataSources.trackerAPI.getDeliveryStatus({ 
        id: id, courierCode: courierCode 
      }),
    user: async (_, __, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser(),
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return new Buffer.from(email).toString('base64');
    },
    uploadProfileImage: async(_, { file }, { dataSources }) =>
      dataSources.userAPI.uploadProfileImage({ file }),
  },
};
