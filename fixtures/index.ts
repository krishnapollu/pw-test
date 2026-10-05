import { test as base } from '@playwright/test';
import { HomePage }     from '../pages/HomePage';
import { LoginPage }    from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage }     from '../pages/CartPage';
import { AuthHelper }   from '../helpers/AuthHelper';
import { createLogger, Logger } from '../helpers/logger';

type Fixtures = {
  reportLifecycle: void;
  logger:       Logger;
  homePage:     HomePage;
  loginPage:    LoginPage;
  productsPage: ProductsPage;
  cartPage:     CartPage;
  authHelper:   AuthHelper;
};

export const test = base.extend<Fixtures>({
  logger: async ({}, use, testInfo) => {
    await use(createLogger(testInfo.title));
  },
  reportLifecycle: [async ({ logger }, use, testInfo) => {
    logger.info(`[test:start] project=${testInfo.project.name} | attempt=${testInfo.retry + 1}`);
    try {
      await use();
    } finally {
      logger.info(`[test:end] status=${testInfo.status}`);
    }
  }, { auto: true }],
  homePage:     async ({ page }, use) => use(new HomePage(page)),
  loginPage:    async ({ page }, use) => use(new LoginPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage:     async ({ page }, use) => use(new CartPage(page)),
  authHelper:   async ({ page }, use) => use(new AuthHelper(page)),
});

export { expect } from '@playwright/test';

export async function step<T>(title: string, action: () => Promise<T>): Promise<T> {
  return test.step(title, async () => {
    console.log(`[step:start] ${title}`);
    try {
      const result = await action();
      console.log(`[step:pass] ${title}`);
      return result;
    } catch (error) {
      console.error(`[step:fail] ${title}`);
      throw error;
    }
  });
}
