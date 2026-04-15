module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/scripts/game.js',
    'src/lib/**/*.js',
    'src/modules/**/*.js',
    'src/features/**/*.js',
    '!src/**/*.test.js',
  ],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  testMatch: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'jest': {
      'useESM': true
    }
  },
};
