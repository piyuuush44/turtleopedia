module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 60,
      statements: 60,
    },
  },
  testEnvironment: 'node',
};
