module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.test.{js,jsx}"],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/setupTests.jsx"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.jsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
