import assert from 'node:assert/strict';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { after, before, test } from 'node:test';
import { createApp } from '../src/app.js';

let server: Server;
let baseUrl: string;

before(() => {
  server = createApp().listen(0);
  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(() => new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())));

test('health endpoint is available', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, status: 'ok' });
});

test('invalid contact message is rejected before database access', async () => {
  const response = await fetch(`${baseUrl}/api/content/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-email' }),
  });
  assert.equal(response.status, 422);
});

test('removed account routes return a JSON 404', async () => {
  const response = await fetch(`${baseUrl}/api/auth/login`, { method: 'POST' });
  assert.equal(response.status, 404);
});

test('unknown routes return a JSON 404', async () => {
  const response = await fetch(`${baseUrl}/api/not-a-route`);
  assert.equal(response.status, 404);
  assert.equal((await response.json()).message, 'Route not found');
});
