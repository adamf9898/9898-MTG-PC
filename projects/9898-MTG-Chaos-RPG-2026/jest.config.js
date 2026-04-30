module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/tests'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  testMatch: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
