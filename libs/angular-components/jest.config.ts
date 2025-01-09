const jestConfig = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleNameMapper: {
    "^.+\\.html$": "identity-obj-proxy",
    "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy"
  },
  resolver: "jest-preset-angular/build/resolvers/ng-jest-resolver.js",
  testEnvironment: 'jsdom',
};

export default jestConfig;