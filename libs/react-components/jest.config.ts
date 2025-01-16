const jestConfig = {
  displayName: 'components',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'] },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es)/)'],
  coverageDirectory: '../../coverage/libs/react-components',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default jestConfig;
