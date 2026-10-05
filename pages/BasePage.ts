import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(readonly page: Page) {}

  async navigate(path = ''): Promise<void> {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
}
