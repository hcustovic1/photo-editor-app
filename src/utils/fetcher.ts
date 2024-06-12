export interface FetcherResponse<T> {
  data: T;
  headers: Headers;
}

/**
 * Fetches data from the specified URL and returns a promise that resolves to a FetcherResponse object containing the fetched data and the response headers.
 *
 * @param {string} url - The URL to fetch data from.
 * @return {Promise<FetcherResponse<T>>} A promise that resolves to a FetcherResponse object containing the fetched data and the response headers.
 * @throws {Error} If the fetch request fails or the response is not ok.
 */
export const fetcher = async <T>(url: string): Promise<FetcherResponse<T>> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return { data, headers: response.headers };
};
