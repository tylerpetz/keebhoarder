const faker = require('faker')

const categories = ['Keyboard', 'Keycap Set', 'Artisan Keycap', 'Switch', 'Case', 'PCB', 'Cable', 'Deskmat', 'Lube', 'Other']
const transactionTypes = ['Buy', 'Sell', 'Trade']

const randomCategory = categories[Math.floor(Math.random() * categories.length)]
const randomTransactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]

const mocks = {
  Item: () => ({
    id: faker.random.number(),
    name: faker.commerce.productName(),
    description: faker.random.words(),
  }),
  ItemAttributes: () => ({
    colorway: faker.commerce.color(),
    maker: faker.commerce.product(),
    model: faker.commerce.productName()
  }),
  Image: () => ({
    id: faker.random.number(),
    url: faker.image.image(),
    name: faker.random.word(),
    description: faker.random.words()
  }),
  Category: () => ({
    id: faker.random.number(),
    name: randomCategory,
    icon: `${randomCategory}.svg`,
    description: faker.random.words(),
  }),
  Note: () => ({
    id: faker.random.number(),
    content: faker.random.words(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past()
  }),
  PriceHistory: () => ({
    id: faker.random.number(),
    updateType: randomTransactionType,
    price: faker.commerce.price(),
    createdAt: faker.date.past(),
  })
};

module.exports = { mocks };
