import { test, expect } from '@playwright/test';

test('GET /api/ipam/prefixes/ returns a list', async ({ request }) => {
  const response = await request.get('/api/ipam/prefixes/');
  
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.count).toBeGreaterThan(0);
});

test('POST /api/ipam/prefixes/ creates a new prefix', async ({ request }) => {
  const response = await request.post('/api/ipam/prefixes/', {
    data: {
      prefix: '192.168.0.0/24',
      status: 'active',
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.prefix).toBe('192.168.0.0/24');

  // Cleanup
  const deleteResponse = await request.delete(`/api/ipam/prefixes/${body.id}/`);
  expect(deleteResponse.status()).toBe(204);
});

test('POST /api/ipam/prefixes/ rejects invalid CIDR', async ({ request }) => {
  const response = await request.post('/api/ipam/prefixes/', {
    data: {
      prefix: 'not-a-valid-prefix',
      status: 'active',
    }
  });

  expect(response.status()).toBe(400);
});