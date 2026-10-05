import { defineConfig, devices } from '@playwright/test';

const artifactRunId = process.env.PW_TEST_ARTIFACT_RUN_ID;
if (artifactRunId && !/^[a-z0-9-]{1,100}$/.test(artifactRunId)) {
  throw new Error('Invalid PW_TEST_ARTIFACT_RUN_ID');
}

export default defineConfig({
  testDir: './tests',
  outputDir: artifactRunId ? `.logbook/artifacts/${artifactRunId}/test-results` : 'test-results',
  fullyParallel: true,
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list'], ['playwright-logbook', { title: 'pw-test', captureDetails: true }]],
  use: {
    baseURL: 'https://automationexercise.com',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: /api\.spec\.ts/,
    },
    {
      name: 'chromium',
      testIgnore: /api\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
