import useSWR, { SWRResponse } from 'swr';
import { FetcherResponse, fetcher } from '../utils/fetcher';
import { Image } from '../types';

export const useImages = (
  page: number = 1,
  limit: number = 20
): SWRResponse<FetcherResponse<Image[]>, Error> => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${
      import.meta.env.VITE_IMAGES_API_BASE_URL
    }/v2/list?page=${page}&limit=${limit}`,
    fetcher<Image[]>
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};
