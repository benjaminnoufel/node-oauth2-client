// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    coveragePathIgnorePatterns: [
        "src/index.ts"
    ],
    modulePathIgnorePatterns: ["./.cache/*"],
    preset: "ts-jest",
    testEnvironment: "node",
    testTimeout: 30000
};
