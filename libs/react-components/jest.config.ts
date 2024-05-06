const jestConfig = {
  displayName: 'components',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es|react-sticky-box)/)'],
  coverageDirectory: '../../coverage/libs/react-components/community',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};

export default jestConfig;
