module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  roots: ['<rootDir>/src'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue']
}
