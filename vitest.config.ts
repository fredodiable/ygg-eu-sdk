import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,

    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/unit/**/*.test.ts'],
          setupFiles: ['./tests/setup.unit.ts'],
        },
      },
      {
        test: {
          name: 'integration',
          environment: 'node',
          include: ['tests/integration/**/*.test.ts'],
          setupFiles: ['./tests/setup.integration.ts'],
        },
      },
    ],
  },
});
