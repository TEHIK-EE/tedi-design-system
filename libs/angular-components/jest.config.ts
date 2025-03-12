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
} satisfies JestConfigWithTsJest;
