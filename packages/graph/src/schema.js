const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = gql`
  type Query {
    deliveryStatus(id: String!, courierCode: String!): DeliveryStatus
    orders(userId: Int, id: Int): [Order]
    user(email: String!): User
    users(email: String): [User]
    items: [Item]
    orderItems: [OrderItem]

  }

  type Mutation {
    login(email: String): String 
    createUser(email: String): User
    createOrder(name: String): Order
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

  type User{
    id: ID!
    email: String!
    profileImage: String
    inventory: [Inventory]
    orders: [Order]
  }
  

  input OrderInput {
    id: Int
    name: String
    trackingNumber: String
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, ctx) => {
      return ctx.prisma.user.findMany()
    },
    items: (parent, args, ctx) => {
      return ctx.prisma.item.findMany()
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
    }, 
    items: (parent, args, ctx) => {
      return ctx.prisma.item
        .findMany({
          where: { orderId: parent.id },
        })
    },  
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