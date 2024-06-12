import useSWR, { SWRResponse } from 'swr';
import { FetcherResponse, fetcher } from '../utils/fetcher';
import { Image } from '../types';

export const useImages = (
  page: number = 1,
  limit: number = 25
): SWRResponse<FetcherResponse<Image[]>, Error> => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${
      import.meta.env.VITE_IMAGES_API_BASE_URL
    }/v2/list?page=${page}&limit=${limit}`,
    fetcher<Image[]>,
    {
      // cache the data for 5 minutes for each API call
      dedupingInterval: 300000,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
