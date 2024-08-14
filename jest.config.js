/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  // Specify the directory or pattern for test files
  testMatch: [
    "**/test/**/*.test.ts", // Match any .test.ts files inside the test folder
  ],
};