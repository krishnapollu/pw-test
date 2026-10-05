import { test, expect, step } from '../../fixtures';
import { EXISTING_ACCOUNT } from '../../data/testdata';
import { DataHelper } from '../../helpers/DataHelper';

test.describe('Authentication', () => {
  test('login with valid credentials', async ({ authHelper, homePage, logger }) => {
    const email = process.env.PW_TEST_EMAIL ?? '';
    const password = process.env.PW_TEST_PASSWORD ?? '';
    test.skip(!email || !password, 'Set PW_TEST_EMAIL and PW_TEST_PASSWORD for login journeys');
    await step('Log in with configured credentials', () => authHelper.loginAs(email, password));
    await step('Verify the logged-in navigation is visible', async () => {
      expect(await homePage.isLoggedIn()).toBe(true);
    });
  });

  test('login with invalid credentials shows error', async ({ loginPage, logger }) => {
    await step('Open the login page', () => loginPage.goto());
    await step('Submit invalid credentials', () => loginPage.login('wrong@email.com', 'wrongpassword'));
    await step('Verify the invalid credentials error', async () => {
      const error = await loginPage.getLoginError();
      logger.info(`Login error: ${error}`);
      expect(error).toContain('Your email or password is incorrect!');
    });
  });

  test('signup with already registered email shows error', async ({ loginPage, logger }) => {
    await step('Open the signup form', () => loginPage.goto());
    await step('Submit an already registered account', () => loginPage.signup(EXISTING_ACCOUNT.name, EXISTING_ACCOUNT.email));
    await step('Verify the duplicate email error', async () => {
      const error = await loginPage.getSignupError();
      logger.info(`Signup error: ${error}`);
      expect(error).toContain('Email Address already exist!');
    });
  });

  test('signup with new email navigates to registration', async ({ loginPage, logger }) => {
    await step('Open the signup form', () => loginPage.goto());
    await step('Submit generated signup details', () => loginPage.signup(DataHelper.randomName(), DataHelper.randomEmail()));
    await step('Verify navigation to registration', async () => {
      await loginPage.page.waitForURL('**/signup');
      logger.info(`Navigated to: ${loginPage.page.url()}`);
      expect(loginPage.page.url()).toContain('/signup');
    });
  });

  test('logout redirects to login page', async ({ authHelper, loginPage, logger }) => {
    const email = process.env.PW_TEST_EMAIL ?? '';
    const password = process.env.PW_TEST_PASSWORD ?? '';
    test.skip(!email || !password, 'Set PW_TEST_EMAIL and PW_TEST_PASSWORD for login journeys');
    await step('Log in with configured credentials', () => authHelper.loginAs(email, password));
    await step('Log out of the account', () => authHelper.logout());
    await step('Verify redirect to login', async () => {
      logger.info(`Redirected to: ${loginPage.page.url()}`);
      expect(loginPage.page.url()).toContain('/login');
    });
  });
});
