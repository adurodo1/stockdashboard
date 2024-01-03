module.exports = {
  collectCoverage: true,

  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/setupTests.jsx"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.jsx"],
  coverageReporters: ["text-summary", "html"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
