import { describe, it, expect, vi } from 'vitest';
import { fetcher } from './fetcher';

global.fetch = vi.fn();

describe('fetcher', () => {
  it('should fetch data successfully and include x-total-count header', async () => {
    const mockData = { key: 'value' };
    const mockHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-total-count': '100',
    });

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
      headers: mockHeaders,
    });

    const url = 'https://api.example.com/data';
    const result = await fetcher<typeof mockData>(url);

    expect(result.data).toEqual(mockData);
    expect(result.headers).toEqual(mockHeaders);
    expect(result.headers.get('x-total-count')).toEqual('100');
  });

  it('should throw an error if fetch fails', async () => {
    // Mock the fetch response to be not ok
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const url = 'https://api.example.com/data';

    await expect(fetcher(url)).rejects.toThrow('Failed to fetch data');
  });

  it('should throw an error if fetch throws an exception', async () => {
    // Mock the fetch to throw an error
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const url = 'https://api.example.com/data';

    await expect(fetcher(url)).rejects.toThrow('Network error');
  });
});
