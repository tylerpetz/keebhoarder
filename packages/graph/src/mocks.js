const faker = require('faker')
const deliveryStatuses = [
    'InfoReceived',
    'Pending',
    'InTransit',
    'Delivered',
    'Exception',
    'FailAttempt'
]

const mocks = {
    Courier: () => ({
      code: () => faker.address.latitude(),
      name: () => faker.address.latitude(),
    }),
    DeliveryCheckpoints: () => ({
      location: () => faker.random.uuid(),
      message: () => faker.random.words(),
      updatedAt: () => faker.date.past(),
    }),
    DeliveryStatus: () => ({
      number: () => faker.random.number(),
      status: () => deliveryStatuses[Math.floor(Math.random() * deliveryStatuses.length)],
    }),
    Item: () => ({
      id: faker.random.number(),
      trackingNumber: faker.random.uuid(),
      name: faker.random.word(),
      price: faker.random.number(),
      description: faker.random.words()
    }),
    Order: () => ({
      id: faker.random.number(),
      trackingNumber: faker.random.uuid()
    }),
    Image: () => ({
      id: faker.random.number(),
      url: faker.image.image(),
      name: faker.random.word(),
      description: faker.random.words()
    }),
     User: () => ({
      email: () => faker.internet.emailAddress(),
    })
};

module.exports = { mocks };
