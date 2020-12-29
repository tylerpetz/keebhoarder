const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    orders(id: Int): [Order]
    items: [Item],
    getItemById(id: Int): Item 
  }

  type Order{
    id: ID!
    items: [Item]
    notes: [Note]
    seller: Vendor
    tax: Int
    shipping: Int
  }

  type Vendor{
    id: ID!
    name: String
    url: String
  }

  type Image {
    id: ID!
    url: String
    name: String
    description: String
  }

  type Note {
    id: ID!
    content: String
    createdAt: String
    updatedAt: String
  }

  type Category {
    id: ID!
    name: String
    icon: String
    description: String
    createdAt: String
  }

  type Item {
    id: ID!
    name: String
    description: String
    attributes: ItemAttributes
    category: Category
    qty: Int
    images: [Image]
    notes: [Note]
    priceHistory: [PriceHistory]
  }

  type ItemAttributes {
    colorway: String
    maker: String
    model: String
  }

  type PriceHistory {
    id: ID!
    updateType: String
    price: String
    createdAt: String
  }
`;

module.exports = typeDefs;
