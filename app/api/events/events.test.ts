import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../../../mocks/node';
import { mockEvents } from '../../../mocks/mockData';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('api/events', () => {
  it('should return events', async () => {
    const response = await fetch('http://localhost/api/events');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toEqual(mockEvents);
  });
});
