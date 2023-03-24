module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.ts$': ['babel-jest', { configFile: './config/babel.config.js' }],
    '\\.tsx$': ['babel-jest', { configFile: './config/babel.config.js' }],
  },
  setupFilesAfterEnv: ['<rootDir>/config/setupJest.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules/', 
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.tsx'
  ],
  coverageThreshold: {
    global: { // Always increase, never decrease
      branches: 7,
      functions: 13,
      lines: 14,
      statements: 13,
    },
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}
