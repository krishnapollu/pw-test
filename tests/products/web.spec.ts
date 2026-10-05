import { test, expect, step } from '../../fixtures';
import { SEARCH_TERMS } from '../../data/testdata';

test.describe('Products', () => {
  test.beforeEach(async ({ productsPage }) => {
    await step('Open the products page', () => productsPage.goto());
  });

  test('products page loads with items', async ({ productsPage, logger }) => {
    await step('Verify the product catalogue contains items', async () => {
      const count = await productsPage.getProductCount();
      logger.info(`Product count: ${count}`);
      expect(count).toBeGreaterThan(0);
    });
  });

  test('search for dress returns results', async ({ productsPage, logger }) => {
    await step('Search for dresses', () => productsPage.searchProduct(SEARCH_TERMS.dress));
    await step('Verify matching dress results', async () => {
      const names = await productsPage.getProductNames();
      logger.info(`Dress results: ${names.length}`);
      expect(names.length).toBeGreaterThan(0);
      expect(names.some(name => name.toLowerCase().includes(SEARCH_TERMS.dress))).toBe(true);
    });
  });

  test('search for tshirt returns results', async ({ productsPage, logger }) => {
    await step('Search for tshirts', () => productsPage.searchProduct(SEARCH_TERMS.tshirt));
    await step('Verify tshirt search returns items', async () => {
      const count = await productsPage.getProductCount();
      logger.info(`Tshirt results: ${count}`);
      expect(count).toBeGreaterThan(0);
    });
  });

  test('search with no match shows empty results', async ({ productsPage, logger }) => {
    await step('Search for a nonexistent product', () => productsPage.searchProduct('xyznonexistentproduct123'));
    await step('Verify search results are empty', async () => {
      const count = await productsPage.getProductCount();
      logger.info(`Unmatched search results: ${count}`);
      expect(count).toBe(0);
    });
  });

  test('add product to cart shows modal', async ({ productsPage }) => {
    await step('Add the first product to cart', () => productsPage.addProductToCart(0));
    await step('Verify the cart confirmation modal', async () => {
      await expect(productsPage.page.locator('.modal-content')).toBeVisible();
    });
  });
});
