import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.stories.{js,jsx}",
    "!src/app/**/*.js",
    "!src/data/**",
    "!src/lib/registry.js",
    "!src/styles/**",
    "!src/test-utils/**",
  ],
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/tests/e2e/",
    "<rootDir>/storybook-static/",
  ],
};

export default createJestConfig(config);
