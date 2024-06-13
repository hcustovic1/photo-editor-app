import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageEditorPage } from './ImageEditorPage';
import * as imageUtils from '../../utils/image-utils';

describe('ImageEditorPage', () => {
  const mockConstructImageUrl = vi.spyOn(imageUtils, 'constructImageUrl');
  const mockGetImageEditorStateFromParams = vi.spyOn(
    imageUtils,
    'getImageEditorStateFromParams'
  );
  const mockUpdateSearchParams = vi.spyOn(imageUtils, 'updateSearchParams');
  const mockDownloadImage = vi
    .spyOn(imageUtils, 'downloadImage')
    .mockResolvedValue(undefined);

  beforeEach(() => {
    mockConstructImageUrl.mockImplementation(
      (imageId, { width, height, greyscale, blur }) =>
        `https://example.com/mock-image?id=${imageId}&width=${width}&height=${height}&greyscale=${greyscale}&blur=${blur}`
    );
    mockGetImageEditorStateFromParams.mockReturnValue({
      width: 600,
      height: 400,
      greyscale: false,
      blur: 0,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Routes>
          <Route path="/edit/:imageId" element={<ImageEditorPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders correctly with initial state', () => {
    renderComponent();

    expect(screen.getByText('Image Preview')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/mock-image?id=1&width=600&height=400&greyscale=false&blur=0'
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Edited preview');
  });

  test('updates image URL and search params on width change', async () => {
    renderComponent();

    const widthInput = screen.getByLabelText('Width:');
    fireEvent.change(widthInput, { target: { value: '800' } });

    await waitFor(() => {
      expect(mockConstructImageUrl).toHaveBeenCalledWith('1', {
        width: 800,
        height: 400,
        greyscale: false,
        blur: 0,
      });
      expect(mockUpdateSearchParams).toHaveBeenCalledWith({
        width: 800,
        height: 400,
        greyscale: false,
        blur: 0,
      });
    });
  });

  test('updates image URL and search params on height change', async () => {
    renderComponent();

    const heightInput = screen.getByLabelText('Height:');
    fireEvent.change(heightInput, { target: { value: '600' } });

    await waitFor(() => {
      expect(mockConstructImageUrl).toHaveBeenCalledWith('1', {
        width: 600,
        height: 600,
        greyscale: false,
        blur: 0,
      });
      expect(mockUpdateSearchParams).toHaveBeenCalledWith({
        width: 600,
        height: 600,
        greyscale: false,
        blur: 0,
      });
    });
  });

  test('updates image URL and search params on greyscale change', async () => {
    renderComponent();

    const greyscaleInput = screen.getByLabelText('Greyscale:');
    fireEvent.click(greyscaleInput);

    await waitFor(() => {
      expect(mockConstructImageUrl).toHaveBeenCalledWith('1', {
        width: 600,
        height: 400,
        greyscale: true,
        blur: 0,
      });
      expect(mockUpdateSearchParams).toHaveBeenCalledWith({
        width: 600,
        height: 400,
        greyscale: true,
        blur: 0,
      });
    });
  });

  test('updates image URL and search params on blur change', async () => {
    renderComponent();

    const blurInput = screen.getByLabelText('Blur:');
    fireEvent.change(blurInput, { target: { value: '5' } });

    await waitFor(() => {
      expect(mockConstructImageUrl).toHaveBeenCalledWith('1', {
        width: 600,
        height: 400,
        greyscale: false,
        blur: 5,
      });
      expect(mockUpdateSearchParams).toHaveBeenCalledWith({
        width: 600,
        height: 400,
        greyscale: false,
        blur: 5,
      });
    });
  });

  test('calls downloadImage on download button click', async () => {
    renderComponent();

    const downloadButton = screen.getByRole('button', {
      name: /download edited image/i,
    });
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(mockDownloadImage).toHaveBeenCalledWith(
        'https://example.com/mock-image?id=1&width=600&height=400&greyscale=false&blur=0',
        'image_600x400.jpg'
      );
    });
  });

  test('resets state and updates search params on discard changes button click', () => {
    renderComponent();

    const discardButton = screen.getByRole('button', {
      name: /discard changes/i,
    });
    fireEvent.click(discardButton);

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/mock-image?id=1&width=600&height=400&greyscale=false&blur=0'
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Edited preview');
    expect(mockUpdateSearchParams).toHaveBeenCalledWith({
      width: 600,
      height: 400,
      greyscale: false,
      blur: 0,
    });
  });
});
