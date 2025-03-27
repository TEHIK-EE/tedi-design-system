import presets from "jest-preset-angular/presets";
import { type JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

export default {
  ...presets.createCjsPreset(),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  resolver: "jest-preset-angular/build/resolvers/ng-jest-resolver.js",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["tedi/components/**/*.{js,ts,tsx}"],
  coveragePathIgnorePatterns: ["\\.stories\\.ts$"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
} satisfies JestConfigWithTsJest;
