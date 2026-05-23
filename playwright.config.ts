import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'bun run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
})
