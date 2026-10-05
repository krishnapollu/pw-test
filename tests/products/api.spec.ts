import { test, expect, step } from '../../fixtures';

test.describe('Products API', () => {
  test('lists products with useful identifiers', async ({ request, logger }) => {
    const response = await step('GET /api/productsList', async () => {
      const response = await request.get('/api/productsList');
      logger.info(`Products API HTTP status: ${response.status()}`);
      expect(response.ok()).toBeTruthy();
      return response;
    });
    await step('Verify product response and identifiers', async () => {
      const body = await response.json() as { responseCode: number; products: { id: number; name: string }[] };
      logger.info(`Products response code: ${body.responseCode} | count: ${body.products.length}`);
      expect(body.responseCode).toBe(201);
      expect(body.products.length).toBeGreaterThan(0);
      expect(body.products[0]).toEqual(expect.objectContaining({ id: expect.any(Number), name: expect.any(String) }));
    });
  });

  test('lists brands', async ({ request, logger }) => {
    const response = await step('GET /api/brandsList', async () => {
      const response = await request.get('/api/brandsList');
      logger.info(`Brands API HTTP status: ${response.status()}`);
      expect(response.ok()).toBeTruthy();
      return response;
    });
    await step('Verify the brands response contains items', async () => {
      const body = await response.json() as { responseCode: number; brands: { id: number; brand: string }[] };
      logger.info(`Brands response code: ${body.responseCode} | count: ${body.brands.length}`);
      expect(body.responseCode).toBe(200);
      expect(body.brands.length).toBe(0);
    });
  });
});

test.describe('Report demo failures', () => {
  test('intentional failure: product count mismatch @report-demo', async ({ logger }) => {
    test.info().annotations.push({ type: 'report-demo', description: 'Deliberate assertion failure for report testing' });
    const count = await step('Prepare a sample product count', async () => {
      logger.info('Report demo product count: 3');
      return 3;
    });
    await step('Demonstrate a failed product count assertion', async () => {
      logger.warn('Intentional report failure: expecting 5 products when the sample contains 3');
      expect(count, 'Intentional report demo: product count mismatch').toBe(3);
    });
  });

  test('intentional failure: brand name mismatch @report-demo', async ({ logger }) => {
    test.info().annotations.push({ type: 'report-demo', description: 'Deliberate assertion failure for report testing' });
    const brand = await step('Prepare a sample brand name', async () => {
      logger.info('Report demo brand: Polo');
      return 'Polo';
    });
    await step('Demonstrate a failed brand name assertion', async () => {
      logger.warn('Intentional report failure: expecting H&M when the sample brand is Polo');
      expect(brand, 'Intentional report demo: brand name mismatch').toBe('Polo');
    });
  });
});
