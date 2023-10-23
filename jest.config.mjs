export default {
  // Indicates the directory where Jest should store its cached dependency information.
  // cacheDirectory: '.jest-cache',

  // Automatically clear mock calls, instances, contexts, and results before every test.
  clearMocks: true,

  // The directories to search for test files.
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.mjs'],

  // A list of file extensions your modules use.
  moduleFileExtensions: ['js', 'mjs'],

  // The test environment that will be used for testing.
  testEnvironment: 'node',

  // Transform files with Babel.
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
};
