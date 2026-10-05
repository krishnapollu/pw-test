import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginEmail    = this.page.locator('form[action="/login"] input[data-qa="login-email"]');
  readonly loginPassword = this.page.locator('form[action="/login"] input[data-qa="login-password"]');
  readonly loginBtn      = this.page.locator('button[data-qa="login-button"]');
  readonly loginError    = this.page.locator('form[action="/login"] p');

  readonly signupName    = this.page.locator('input[data-qa="signup-name"]');
  readonly signupEmail   = this.page.locator('input[data-qa="signup-email"]');
  readonly signupBtn     = this.page.locator('button[data-qa="signup-button"]');
  readonly signupError   = this.page.locator('form[action="/signup"] p');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginBtn.click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupBtn.click();
  }

  async getLoginError(): Promise<string> {
    return this.loginError.innerText();
  }

  async getSignupError(): Promise<string> {
    return this.signupError.innerText();
  }
}
