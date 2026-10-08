# pw-test: real consumer suite for Playwright Logbook

This suite exercises the public [Automation Exercise practice site](https://automationexercise.com/) using the published Logbook package. Tests are organized by business module (`auth`, `products`, `cart`), with products covering web, API-only, and an API-plus-web journey. Unlike Logbook's deterministic fixture, this is a live-site consumer check and may fail when the site or network changes.

```sh
npm test                 # all modules in one Playwright/Logbook run
npm run test:auth        # only auth
npm run test:products    # web + API + API/web products tests
npm run test:cart        # only cart
npm run test:api         # API-only products tests
npm run test:api-web     # one combined API/web journey
```

Each command generates a unique `pw-test-<target>-...` Logbook run ID and prints the path of a saved report under `.logbook/reports/<run-id>/index.html`. The latest report is also `.logbook/report/index.html`; prior run JSON remains in `.logbook/runs/`. Playwright artifacts for each run are retained under `.logbook/artifacts/<run-id>/test-results/`, so a later module run does not erase a saved report's screenshots, videos, or traces. This tests separate invocations without pretending they are one Playwright run. The regular Playwright HTML report is also generated. Extra Playwright CLI arguments can be passed after `--`, for example `npm run test:products -- --grep search`.

The **Logbook CI bundle** GitHub Actions workflow runs on pushes to `main` or manual dispatch. It runs this suite, exports one project-bound `ci-run.logbook.zip`, and uploads it as the `logbook-run` artifact for 30 days. Test failures still make the workflow fail, while the export and upload steps run afterward. In a trusted VS Code workspace, set `logbook.ciRepository` to `krishnapollu/pw-test`, then choose **Logbook: Fetch CI Run from GitHub Actions…**. Select the recent artifact and enter project ID `pw-test` on first import. The workflow and fetch action do not share local developer runs.

The public site's old example credentials no longer authenticate. The two positive login/logout tests are explicitly skipped unless `PW_TEST_EMAIL` and `PW_TEST_PASSWORD` name an account you control. Do not commit credentials or share a trace/report from an authenticated run without reviewing it for secrets; Playwright artifacts can contain page data and input values. Saved artifacts have no automatic expiry; remove old run directories under `.logbook/artifacts/` deliberately when no longer needed. No test creates or deletes an account.

For validation after changing Logbook, install a candidate package explicitly, then run at least `npm run test:api`, `npm run test:api-web`, one module command, and `npm test`. Compare Logbook's run counts with Playwright's outcomes and inspect a saved report's trace/attachment links. The old `vendor/` tarballs remain historical snapshots and are not used by `npm ci`.

All tests include named report steps, step start/pass/failure logs, and test lifecycle logs with project, attempt, and final status. API status codes and result counts are logged without logging credentials.

Two `@report-demo` tests in `tests/products/api.spec.ts` intentionally fail with sample data to exercise assertion errors, failed steps, stdout/stderr, and retries in the reports. They run without network access and remain failures on retry. Commands including API tests therefore exit with a nonzero status by design. Run just these examples with `npm run test:api -- --grep @report-demo`, or exclude them with `npm test -- --grep-invert @report-demo`.
