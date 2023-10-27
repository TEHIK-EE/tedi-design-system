const jestConfig = {
  displayName: 'components',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es)/)'],
  coverageDirectory: '../../coverage/packages/components',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};

export default jestConfig;
