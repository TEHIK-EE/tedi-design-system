const jestConfig = {
  displayName: 'components',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/components',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};

export default jestConfig;
