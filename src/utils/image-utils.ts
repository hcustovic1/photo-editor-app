export interface ImageEditorState {
  width: number;
  height: number;
  greyscale: boolean;
  blur: number;
}

export const constructImageUrl = (
  imageId: string,
  { width, height, greyscale, blur }: ImageEditorState
): string => {
  return `https://picsum.photos/id/${imageId}/${width}/${height}${
    greyscale ? '?grayscale' : ''
  }${blur ? `${greyscale ? '&' : '?'}blur=${blur}` : ''}`;
};

export const getImageEditorStateFromParams = (
  searchParams: URLSearchParams
): ImageEditorState => {
  const width = parseInt(searchParams.get('width') || '600', 10);
  const height = parseInt(searchParams.get('height') || '400', 10);
  const greyscale = searchParams.get('greyscale') === 'true';
  const blur = parseInt(searchParams.get('blur') || '0', 10);
  return { width, height, greyscale, blur };
};

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
