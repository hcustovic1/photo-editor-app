import { describe, test, expect, vi, Mock } from 'vitest';
import { fetcher } from './fetcher';

globalThis.fetch = vi.fn();

const MOCK_API_URL = 'https://api.example.com/data';

describe('fetcher', () => {
  test('should fetch data successfully and include x-total-count header', async () => {
    const mockData = { key: 'value' };
    const mockHeaders = new Headers({
      'Content-Type': 'application/json',
    });

    // Mock the fetch response
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
      headers: mockHeaders,
    });

    const result = await fetcher<typeof mockData>(MOCK_API_URL);

    expect(result.data).toEqual(mockData);
    expect(result.headers).toEqual(mockHeaders);
  });

  test('should throw an error if fetch fails', async () => {
    // Mock the fetch response to be not ok
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetcher(MOCK_API_URL)).rejects.toThrow('Failed to fetch data');
  });

  test('should throw an error if fetch throws an exception', async () => {
    // Mock the fetch to throw an error
    (globalThis.fetch as Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetcher(MOCK_API_URL)).rejects.toThrow('Network error');
  });
});
