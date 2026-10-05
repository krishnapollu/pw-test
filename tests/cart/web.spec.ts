import { test, expect, step } from '../../fixtures';

test.describe('Cart', () => {
  test('empty cart shows empty message', async ({ cartPage }) => {
    await step('Open an empty cart', () => cartPage.goto());
    await step('Verify the empty cart message', async () => {
      expect(await cartPage.isCartEmpty()).toBe(true);
    });
  });

  test('added product appears in cart', async ({ productsPage, cartPage, logger }) => {
    await step('Open the products page', () => productsPage.goto());
    await step('Add the first product to cart', () => productsPage.addProductToCart(0));
    await step('View the cart', () => productsPage.viewCart());
    await step('Verify the cart contains an item', async () => {
      const count = await cartPage.getCartItemCount();
      logger.info(`Cart item count: ${count}`);
      expect(count).toBeGreaterThan(0);
    });
  });

  test('cart shows product name and price', async ({ productsPage, cartPage, logger }) => {
    await step('Open the products page', () => productsPage.goto());
    await step('Add the first product to cart', () => productsPage.addProductToCart(0));
    await step('View the cart', () => productsPage.viewCart());
    await step('Verify product names and prices', async () => {
      const names = await cartPage.getCartProductNames();
      const prices = await cartPage.getCartPrices();
      logger.info(`Cart products: ${names.join(', ')} | prices: ${prices.join(', ')}`);
      expect(names.length).toBeGreaterThan(0);
      expect(prices.length).toBeGreaterThan(0);
    });
  });

  test('removing item from cart empties it', async ({ productsPage, cartPage }) => {
    await step('Open the products page', () => productsPage.goto());
    await step('Add the first product to cart', () => productsPage.addProductToCart(0));
    await step('View the cart', () => productsPage.viewCart());
    await step('Remove the first cart item', () => cartPage.removeItem(0));
    await step('Verify the cart becomes empty', async () => {
      await expect(cartPage.emptyCartMsg).toBeVisible();
    });
  });

  test('multiple products can be added to cart', async ({ productsPage, cartPage, logger }) => {
    await step('Open the products page', () => productsPage.goto());
    await step('Add the first product to cart', () => productsPage.addProductToCart(0));
    await step('Continue shopping', () => productsPage.continueShopping());
    await step('Add the second product to cart', () => productsPage.addProductToCart(1));
    await step('View the cart', () => productsPage.viewCart());
    await step('Verify the cart contains both products', async () => {
      const count = await cartPage.getCartItemCount();
      logger.info(`Cart item count: ${count}`);
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });
});
