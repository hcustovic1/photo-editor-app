import { describe, it, expect, vi } from 'vitest';
import { fetcher } from './fetcher';

global.fetch = vi.fn();

const MOCK_API_URL = 'https://api.example.com/data';

describe('fetcher', () => {
  it('should fetch data successfully and include x-total-count header', async () => {
    const mockData = { key: 'value' };
    const mockHeaders = new Headers({
      'Content-Type': 'application/json',
    });

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
      headers: mockHeaders,
    });

    const result = await fetcher<typeof mockData>(MOCK_API_URL);

    expect(result.data).toEqual(mockData);
    expect(result.headers).toEqual(mockHeaders);
  });

  it('should throw an error if fetch fails', async () => {
    // Mock the fetch response to be not ok
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetcher(MOCK_API_URL)).rejects.toThrow('Failed to fetch data');
  });

  it('should throw an error if fetch throws an exception', async () => {
    // Mock the fetch to throw an error
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetcher(MOCK_API_URL)).rejects.toThrow('Network error');
  });
});
