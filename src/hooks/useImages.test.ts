import * as SWR from 'swr';
import { renderHook, waitFor } from '@testing-library/react';
import { Mock, describe, expect, test, vi } from 'vitest';
import { fetcher } from '../utils/fetcher';
import { useImages } from '../hooks/useImages';
import { mockImagesListData } from '../__mocks__';

vi.mock('../utils/fetcher');
vi.mock('swr', async () => ({
  __esModule: true,
  ...(await vi.importActual('swr')),
}));

describe('useImages', () => {
  test('should call useSWR with correct arguments', async () => {
    const useSWRSpy = vi.spyOn(SWR, 'default');

    (fetcher as Mock).mockResolvedValueOnce(mockImagesListData);

    renderHook(() => useImages(2, 25));

    expect(useSWRSpy).toHaveBeenCalledWith(
      `${import.meta.env.VITE_IMAGES_API_BASE_URL}/v2/list?page=2&limit=25`,
      fetcher
    );

    useSWRSpy.mockRestore();
  });

  test('should fetch and return data correctly', async () => {
    (fetcher as Mock).mockResolvedValueOnce(mockImagesListData);

    const { result } = renderHook(() => useImages(4, 40));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockImagesListData);
      expect(result.current.error).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isValidating).toBe(false);
    });
  });
});
