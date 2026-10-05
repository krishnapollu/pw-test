import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartRows      = this.page.locator('#cart_info_table tbody tr');
  readonly productNames  = this.page.locator('.cart_description h4 a');
  readonly productPrices = this.page.locator('.cart_price p');
  readonly quantities    = this.page.locator('.cart_quantity button');
  readonly deleteButtons = this.page.locator('a.cart_quantity_delete');
  readonly emptyCartMsg  = this.page.locator('#empty_cart');
  readonly checkoutBtn   = this.page.locator('a:has-text("Proceed To Checkout")');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/view_cart');
  }

  async getCartItemCount(): Promise<number> {
    return this.cartRows.count();
  }

  async getCartProductNames(): Promise<string[]> {
    return this.productNames.allInnerTexts();
  }

  async getCartPrices(): Promise<string[]> {
    return this.productPrices.allInnerTexts();
  }

  async removeItem(index = 0): Promise<void> {
    await this.deleteButtons.nth(index).click();
  }

  async isCartEmpty(): Promise<boolean> {
    return this.emptyCartMsg.isVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutBtn.click();
  }
}
