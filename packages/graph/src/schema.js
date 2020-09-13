const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = gql`
  type Query {
    deliveryStatus(id: String!, courierCode: String!): DeliveryStatus
    orders(userId: Int, id: Int): [Order]
    user(id: Int, email: String): User
    users(id: Int, email: String): [User]
    userItems(id: Int, email: String): User
    orderItems: [OrderItem]
    items(id: Int, userId: Int): [Item]
    brand(id: Int): [Brand]
    brands(id: Int): [Brand]
  }

  type Mutation {
    signupUser(data: UserCreateInput!) : AuthPayLoad!
    loginUser(data: UserLoginInput!): AuthPayLoad!
    createOrder(name: String): Order
    createUser(email: String): User
  }
  
  type AuthPayLoad {
    token: String!
  }

  type Brand {
    id: Int
    name: String
    logo: String
  }

  type Category{
    id: Int
    name: String
    icon: String
  }

  type Token{
    id: Int
    token: String
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
  
  type OrderItem{
    id: Int
    order: Order
    item: Item
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

  type KeyCap {
    id: Int
    brand: Brand
    name: String
    keyCapProfileId: Int
    itemCategoryId:  Int
  }

  type KeyCapProfile {
    id:      Int      
    name:    String
    keyCaps:  [KeyCap]
  }

  type User{
    id: ID!
    email: String!
    profileImage: String
    inventory: [Inventory]
    orders: [Order]
    items: [Item]
  }
  

  input OrderInput {
    id: Int
    name: String
    trackingNumber: String
  }

  input UserCreateInput {
    email: String!
    password: String!
  }
  
  input UserLoginInput {
    email: String!
    password: String!
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, ctx) => {
      return ctx.prisma.user.findMany({
        where: args,
      })
    },
    items: (parent, args, ctx) => {
      return ctx.prisma.item.findMany()
    },
    brands: (parent, args, ctx) => {
      return ctx.prisma.brand.findMany()
    },
    orders: (parent, args, ctx) => {
      return ctx.prisma.order.findMany()
    },
    orderItems: (parent, args, ctx) => {
      return ctx.prisma.orderItems.findMany()
    }
  },
  Mutation: {
    createUser: (parent, args, ctx) => {
      return ctx.prisma.user.create({
        data: args,
      })
    },
    createOrder: (_, args, ctx) => {
      return ctx.prisma.order.create({
        data: args,
      })
    }
  },
  Order: {
    items: (parent, args, ctx) => {
      return ctx.prisma.item
        .findMany({
          where: { orderId: parent.id },
        })
    },

  },
  User: {
    orders: (parent, args, ctx) => {
      return ctx.prisma.order
        .findMany({
          where: { userId: parent.id },
        })
    }
  },
  OrderItem: {
    item: (parent) => parent.getItem({
      id: parent.itemId
    }),
    order: (parent) => parent.getOrder({
      id: parent.orderId
    }),
  },
}
const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

module.exports = {
  schema
}