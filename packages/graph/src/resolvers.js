const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    deliveryStatus: (_, { id, courierCode }, { dataSources }) =>
      dataSources.trackerAPI.getDeliveryStatus({ 
        id: id, courierCode: courierCode 
      }),
    user: async (_, { email }, { dataSources }) =>
      dataSources.userAPI.findUser({ email }),
    users: async (_, { email }, { dataSources }) =>
      dataSources.userAPI.getAllUsers({ email })
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return new Buffer.from(email).toString('base64');
    },
    createUser: async (_, { email }, { dataSources }) => {
      console.log('ksdfhj')
      const user = await dataSources.userAPI.createUser(email);
      console.log(user)
    },
    addTag(root, { email }, context) {
      console.log(`adding tag '${label}'`)
      return addTag(label)
    },
    uploadProfileImage: async(_, { file }, { dataSources }) =>
      dataSources.userAPI.uploadProfileImage({ file }),
  },
};
