import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput   = this.page.locator('#search_product');
  readonly searchBtn     = this.page.locator('#submit_search');
  readonly productCards  = this.page.locator('.productinfo');
  readonly productNames  = this.page.locator('.productinfo p');
  readonly addToCartBtns = this.page.locator('.productinfo a.add-to-cart');
  readonly continueBtn   = this.page.locator('button:has-text("Continue Shopping")');
  readonly viewCartLink  = this.page.locator('a:has-text("View Cart")').first();

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/products');
  }

  async searchProduct(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchBtn.click();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allInnerTexts();
  }

  async addProductToCart(index = 0): Promise<void> {
    await this.addToCartBtns.nth(index).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueBtn.click();
  }

  async viewCart(): Promise<void> {
    await this.viewCartLink.click();
  }
}
