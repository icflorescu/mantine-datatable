module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.ts$': ['babel-jest', { configFile: './config/babel.config.js' }],
    '\\.tsx$': ['babel-jest', { configFile: './config/babel.config.js' }],
  },
  setupFilesAfterEnv: ['<rootDir>/config/setupJest.ts'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '**/*.tsx'],
  coverageThreshold: {
    global: {
      // Always increase, never decrease
      branches: 6,
      functions: 10,
      lines: 11,
      statements: 10,
    },
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
