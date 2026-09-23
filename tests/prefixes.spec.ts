import { test, expect } from '@playwright/test';

test('GET /api/ipam/prefixes/ returns a list', async ({ request }) => {
  const response = await request.get('/api/ipam/prefixes/');
  
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.count).toBeGreaterThan(0);
});