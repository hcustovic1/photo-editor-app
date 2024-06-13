import { describe, test, expect, vi } from 'vitest';
import {
  constructImageUrl,
  getImageEditorStateFromParams,
  updateSearchParams,
  ImageEditorState,
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
});
