import { test, expect, step } from '../../fixtures';
import { SEARCH_TERMS } from '../../data/testdata';

test('product search is available through API and web', async ({ page, productsPage, logger }) => {
  const term = SEARCH_TERMS.dress;
  const response = await step('Search for dresses through the API', async () => {
    const response = await page.request.post('/api/searchProduct', { form: { search_product: term } });
    logger.info(`Search API HTTP status: ${response.status()}`);
    expect(response.ok()).toBeTruthy();
    return response;
  });
  await step('Verify the API returns matching products', async () => {
    const body = await response.json() as { responseCode: number; products: { name: string }[] };
    logger.info(`API search results: ${body.products.length}`);
    expect(body.responseCode).toBe(200);
    expect(body.products.some((product) => product.name.toLowerCase().includes(term))).toBe(true);
  });
  await step('Open the products page', () => productsPage.goto());
  await step('Search for dresses through the web', () => productsPage.searchProduct(term));
  await step('Verify the web returns matching products', async () => {
    const names = await productsPage.getProductNames();
    logger.info(`Web search results: ${names.length}`);
    expect(names.some((name) => name.toLowerCase().includes(term))).toBe(true);
  });
});
