export interface ImageEditorState {
  width: number;
  height: number;
  greyscale: boolean;
  blur: number;
}

/**
 * Constructs an image URL based on the provided image ID and image editor state.
 *
 * @param {string} imageId - The ID of the image.
 * @param {ImageEditorState} state - The state of the image editor.
 * @returns {string} The constructed image URL.
 */
export const constructImageUrl = (
  imageId: string,
  { width, height, greyscale, blur }: ImageEditorState
): string => {
  return `https://picsum.photos/id/${imageId}/${width}/${height}${
    greyscale ? '?grayscale' : ''
  }${blur ? `${greyscale ? '&' : '?'}blur=${blur}` : ''}`;
};

/**
 * Retrieves the image editor state from the provided URL search parameters.
 *
 * @param {URLSearchParams} searchParams - The URL search parameters containing the image editor state.
 * @returns {ImageEditorState} The image editor state object with the width, height, greyscale, and blur values.
 */
export const getImageEditorStateFromParams = (
  searchParams: URLSearchParams
): ImageEditorState => {
  const width = parseInt(searchParams.get('width') || '600', 10);
  const height = parseInt(searchParams.get('height') || '400', 10);
  const greyscale = searchParams.get('greyscale') === 'true';
  const blur = parseInt(searchParams.get('blur') || '0', 10);
  return { width, height, greyscale, blur };
};

/**
 * Updates the search parameters in the URL based on the provided image editor state.
 *
 * @param {Partial<ImageEditorState>} params - The partial image editor state object containing the updated values.
 * @return {void} This function does not return anything.
 */
export const updateSearchParams = (params: Partial<ImageEditorState>) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (params.width !== undefined)
    searchParams.set('width', params.width.toString());
  if (params.height !== undefined)
    searchParams.set('height', params.height.toString());
  if (params.greyscale !== undefined)
    searchParams.set('greyscale', params.greyscale.toString());
  if (params.blur !== undefined)
    searchParams.set('blur', params.blur.toString());

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.replaceState(null, '', newUrl);
};

/**
 * Downloads an image from the given URL and saves it with the specified filename.
 *
 * @param {string} url - The URL of the image to download.
 * @param {string} filename - The name to save the downloaded image as.
 * @return {Promise<void>} A Promise that resolves when the image is successfully downloaded and saved, or rejects with an error if there was a problem.
 */
export const downloadImage = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error('Error downloading image', err);
  }
};
