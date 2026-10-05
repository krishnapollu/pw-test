import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly navLogin      = this.page.locator('a[href="/login"]');
  readonly navProducts   = this.page.locator('a[href="/products"]');
  readonly navCart       = this.page.locator('a[href="/view_cart"]');
  readonly navLoggedUser = this.page.locator('a:has-text(" Logged in as")');
  readonly navLogout     = this.page.locator('a[href="/logout"]');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }

  async goToLogin(): Promise<void> {
    await this.navLogin.click();
  }

  async goToProducts(): Promise<void> {
    await this.navProducts.click();
  }

  async goToCart(): Promise<void> {
    await this.navCart.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return this.navLoggedUser.isVisible();
  }

  async getLoggedInUsername(): Promise<string> {
    const text = await this.navLoggedUser.innerText();
    return text.replace('Logged in as', '').trim();
  }

  async logout(): Promise<void> {
    await this.navLogout.click();
  }
}
