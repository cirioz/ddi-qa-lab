import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: 'html',
  use: {
    baseURL: process.env.NETBOX_URL,
    extraHTTPHeaders: {
      'Authorization': `Token ${process.env.NETBOX_TOKEN}`,
      'Content-Type': 'application/json',
    },
  },
});