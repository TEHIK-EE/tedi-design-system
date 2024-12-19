import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/dist/**'],
};

export default config;
