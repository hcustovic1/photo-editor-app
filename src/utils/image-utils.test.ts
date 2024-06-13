import { describe, test, expect, vi } from 'vitest';
import {
  constructImageUrl,
  getImageEditorStateFromParams,
  updateSearchParams,
  ImageEditorState,
  downloadImage,
} from './image-utils';

describe('image-utils', () => {
  describe('constructImageUrl', () => {
    test('constructs the correct URL without greyscale and blur', () => {
      const imageId = '123';
      const state: ImageEditorState = {
        width: 600,
        height: 400,
        greyscale: false,
        blur: 0,
      };

      const url = constructImageUrl(imageId, state);

      expect(url).toBe('https://picsum.photos/id/123/600/400');
    });

    test('constructs the correct URL with greyscale and blur', () => {
      const imageId = '123';
      const state: ImageEditorState = {
        width: 600,
        height: 400,
        greyscale: true,
        blur: 5,
      };

      const url = constructImageUrl(imageId, state);

      expect(url).toBe('https://picsum.photos/id/123/600/400?grayscale&blur=5');
    });

    test('constructs the correct URL with only greyscale', () => {
      const imageId = '123';
      const state: ImageEditorState = {
        width: 600,
        height: 400,
        greyscale: true,
        blur: 0,
      };

      const url = constructImageUrl(imageId, state);

      expect(url).toBe('https://picsum.photos/id/123/600/400?grayscale');
    });

    test('constructs the correct URL with only blur', () => {
      const imageId = '123';
      const state: ImageEditorState = {
        width: 600,
        height: 400,
        greyscale: false,
        blur: 5,
      };

      const url = constructImageUrl(imageId, state);

      expect(url).toBe('https://picsum.photos/id/123/600/400?blur=5');
    });
  });

  describe('getImageEditorStateFromParams', () => {
    test('returns the correct state from URL search params', () => {
      const searchParams = new URLSearchParams(
        'width=800&height=600&greyscale=true&blur=3'
      );

      const state = getImageEditorStateFromParams(searchParams);

      expect(state).toEqual({
        width: 800,
        height: 600,
        greyscale: true,
        blur: 3,
      });
    });

    test('returns the default state if params are missing', () => {
      const searchParams = new URLSearchParams();

      const state = getImageEditorStateFromParams(searchParams);

      expect(state).toEqual({
        width: 600,
        height: 400,
        greyscale: false,
        blur: 0,
      });
    });
  });

  describe('updateSearchParams', () => {
    test('updates the URL search params correctly', () => {
      vi.stubGlobal('window', {
        location: {
          search: '',
          pathname: '/edit/123',
        },
        history: {
          replaceState: vi.fn(),
        },
      });

      const params: Partial<ImageEditorState> = {
        width: 800,
        height: 600,
        greyscale: true,
        blur: 5,
      };

      updateSearchParams(params);

      expect(window.history.replaceState).toHaveBeenCalledWith(
        null,
        '',
        '/edit/123?width=800&height=600&greyscale=true&blur=5'
      );
    });

    test('updates only specified params', () => {
      vi.stubGlobal('window', {
        location: {
          search: 'width=800&height=600',
          pathname: '/edit/123',
        },
        history: {
          replaceState: vi.fn(),
        },
      });

      const params: Partial<ImageEditorState> = {
        greyscale: true,
      };

      updateSearchParams(params);

      expect(window.history.replaceState).toHaveBeenCalledWith(
        null,
        '',
        '/edit/123?width=800&height=600&greyscale=true'
      );
    });
  });

  describe('downloadImage', () => {
    test('should download an image successfully', async () => {
      // Mock the fetch response
      const mockBlob = new Blob(['mock data'], { type: 'image/jpeg' });
      const mockFetchResponse = {
        ok: true,
        blob: vi.fn().mockResolvedValue(mockBlob),
      };
      globalThis.fetch = vi.fn().mockResolvedValue(mockFetchResponse);

      // Mock URL.createObjectURL
      const mockObjectUrl = 'blob:mock-url';
      globalThis.URL.createObjectURL = vi.fn().mockReturnValue(mockObjectUrl);
      globalThis.URL.revokeObjectURL = vi.fn();

      // Mock document.createElement and related methods
      const mockLink = {
        href: '',
        download: '',
        click: vi.fn(),
      };
      document.createElement = vi.fn().mockReturnValue(mockLink);
      document.body.appendChild = vi.fn();
      document.body.removeChild = vi.fn();

      const url = 'https://example.com/mock-image.jpg';
      const filename = 'mock-image.jpg';
      await downloadImage(url, filename);

      expect(fetch).toHaveBeenCalledWith(url);
      expect(mockFetchResponse.blob).toHaveBeenCalled();
      expect(mockLink.download).toBe(filename);
      expect(mockLink.click).toHaveBeenCalled();
    });

    test('should handle fetch errors gracefully', async () => {
      // Mock the fetch response to throw an error
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      // Spy on console.error
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Call the function
      const url = 'https://example.com/mock-image.jpg';
      const filename = 'mock-image.jpg';
      await downloadImage(url, filename);

      // Assertions
      expect(fetch).toHaveBeenCalledWith(url);
      expect(console.error).toHaveBeenCalledWith(
        'Error downloading image',
        expect.any(Error)
      );

      // Restore the console.error spy
      consoleErrorSpy.mockRestore();
    });
  });
});
