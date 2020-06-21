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
     User: () => ({
      email: () => faker.internet.emailAddress(),
    })
};

module.exports = { mocks };
