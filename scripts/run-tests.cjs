const { spawnSync } = require('node:child_process');
const { randomUUID } = require('node:crypto');
const path = require('node:path');

const targets = {
  all: [],
  auth: ['tests/auth'],
  products: ['tests/products'],
  cart: ['tests/cart'],
  api: ['tests/products/api.spec.ts'],
  'api-web': ['tests/products/api-web.spec.ts'],
};

const target = process.argv[2];
if (!Object.hasOwn(targets, target)) {
  process.stderr.write(`Unknown target: ${target ?? '(missing)'}\n`);
  process.exitCode = 2;
} else {
  const runId = `pw-test-${target}-${new Date().toISOString().replace(/[-:.TZ]/g, '')}-${randomUUID().slice(0, 8)}`;
  const env = { ...process.env, LOGBOOK_RUN_ID: runId, PW_TEST_ARTIFACT_RUN_ID: runId };
  process.stdout.write(`Logbook run ID: ${runId}\n`);
  const runner = spawnSync(process.execPath, [path.join(__dirname, '../node_modules/@playwright/test/cli.js'), 'test', ...targets[target], ...process.argv.slice(3)], {
    cwd: path.join(__dirname, '..'), env, stdio: 'inherit',
  });
  const report = spawnSync(process.execPath, [path.join(__dirname, '../node_modules/playwright-logbook/dist/cli/bin.js'), 'report', '--run', runId, '--out', `.logbook/reports/${runId}/index.html`], {
    cwd: path.join(__dirname, '..'), env, stdio: 'inherit',
  });
  if (report.status !== 0) process.stderr.write(`Could not create a saved report for ${runId}.\n`);
  process.exitCode = runner.status ?? 1;
}
