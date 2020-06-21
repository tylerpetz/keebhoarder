const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    deliveryStatus(id: String!, courierCode: String!): DeliveryStatus
    user: User
  }

  type Mutation {
    login(email: String): String # login token

    # for use with the iOS tutorial
    uploadProfileImage(file: Upload!): User
  }

  type Courier {
    code:String
    name: String
  }

  type DeliveryCheckpoints {
    courier: Courier
    location: String
    message: String
    time: String
  }

  type DeliveryStatus {
    courier: Courier
    number: String
    status: String
    checkpoints: [DeliveryCheckpoints]
  }
  
  type User {
    id: ID!
    email: String!
    profileImage: String
  }

`;

module.exports = typeDefs;
