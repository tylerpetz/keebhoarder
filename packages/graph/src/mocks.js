const faker = require('faker')

const randomTransactionType = () => faker.random.arrayElement(['Buy', 'Sell', 'Trade'])
const randomCategory = () => faker.random.arrayElement(['Keyboard', 'Keycap Set', 'Artisan Keycap', 'Switch', 'Case', 'PCB', 'Cable', 'Deskmat', 'Lube', 'Other'])
const randomMaker = () => faker.random.arrayElement(['Gothcaps', 'Rathcaps', 'Keyforge', 'Keycult'])
const randomModel = () => faker.random.arrayElement(['Hellcap', 'Brimcap', 'Groot', '1/65'])
const randomColor = () => faker.random.arrayElement(['Polycarbonate', 'Black', 'Grey', 'White', 'Blue', 'Red'])

const mocks = {
  Order: () => ({
    id: faker.random.number(),
    tax: faker.commerce.price(),
    shipping: faker.commerce.price(),
  }),
  Item: () => ({
    id: faker.random.number(),
    name: `${randomMaker()} - ${randomModel()}`,
    description: faker.random.words(),
    quantity: Math.random() * (3 - 1) + 1
  }),
  ItemAttributes: () => ({
    colorway: randomColor,
    maker: randomMaker,
    model: randomModel,
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
    icon: `${randomCategory()}.svg`,
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
  }),
  Vendor: () => ({
    id: faker.random.number(),
    name: faker.company.companyName(),
    url: faker.internet.url()
  })
};

module.exports = { mocks };
