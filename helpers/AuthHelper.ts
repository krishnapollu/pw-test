import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

export class AuthHelper {
  private readonly loginPage: LoginPage;
  private readonly homePage: HomePage;

  constructor(private readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage  = new HomePage(page);
  }

  async loginAs(email: string, password: string): Promise<void> {
    await this.loginPage.goto();
    await this.loginPage.login(email, password);
    await this.page.waitForURL('**/');
  }

  async logout(): Promise<void> {
    await this.homePage.logout();
    await this.page.waitForURL('**/login');
  }

  async isLoggedIn(): Promise<boolean> {
    return this.homePage.isLoggedIn();
  }
}
