const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    deliveryStatus(id: String!, courierCode: String!): DeliveryStatus
    orders(id: Int): [Order]
    user: User,
    items: [Item],
    getItemById(id: Int): Item 
  }

  type Mutation {
    login(email: String): String # login token

    # for use with the iOS tutorial
    uploadProfileImage(file: Upload!): User
  }

  type Category{
    id: Int
    name: String
    icon: String
  }

  type Courier{
    code: String
    name: String
  }

  type DeliveryCheckpoints{
    courier: Courier
    location: String
    message: String
    time: String
  }

  type DeliveryStatus{
    courier: Courier
    number: String
    status: String
    checkpoints: [DeliveryCheckpoints]
  }

  type Note{
    id: Int
    description: String
    createdAt: String
    updatedAt: String
  }

  type Order{
    id: Int
    name: String
    items: [Item]
    status: DeliveryStatus
    notes: [Note]
    trackingNumber: String
    seller: Vendor
    qty: Int
    tax: Int
    shipping: Int
  }

  type Vendor{
    id: String
    name: String
    url: String
  }

  type Image{
    id: Int
    url: String
    name: String
    description: String
  }

  type Inventory{
    id: ID!
    item: [Item]
    status: String
  }

  type Item{
    id: ID!
    name: String
    price: Int
    description: String
    images: [Image]
    categories: [Category]
    notes: [Note]

  }

  type User{
    id: ID!
    email: String!
    profileImage: String
  }

`;

module.exports = typeDefs;
