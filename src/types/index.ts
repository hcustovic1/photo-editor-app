export interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface PaginatedImages {
  images: Image[];
  page: number;
  totalPages: number;
}

export interface ImageEditorState {
  width: number;
  height: number;
  greyscale: boolean;
  blur: number;
}

export type Fetch = typeof fetch;
