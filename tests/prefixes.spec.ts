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

test('GET /api/ipam/prefixes/ rejects unauthenticated request', async ({ request }) => {
  const response = await request.get('/api/ipam/prefixes/', {
    headers: {
      'Authorization': '',
    }
  });

  expect(response.status()).toBe(403);
});

test('POST /api/ipam/prefixes/ allocates an available IP', async ({ request }) => {
  // First create a prefix
  const prefixResponse = await request.post('/api/ipam/prefixes/', {
    data: {
      prefix: '10.10.0.0/24',
      status: 'active',
    }
  });
  expect(prefixResponse.status()).toBe(201);
  const prefix = await prefixResponse.json();

  // Allocate next available IP
  const ipResponse = await request.post(`/api/ipam/prefixes/${prefix.id}/available-ips/`, {
    data: {
      status: 'active',
    }
  });
  expect(ipResponse.status()).toBe(201);
  const ip = await ipResponse.json();
  expect(ip.address).toContain('10.10.0.');

  // Cleanup
  await request.delete(`/api/ipam/prefixes/${prefix.id}/`);
});

