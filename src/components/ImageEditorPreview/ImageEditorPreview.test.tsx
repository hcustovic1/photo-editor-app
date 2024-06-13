import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ImageEditorPreview from './ImageEditorPreview';

describe('ImageEditorPreview Component', () => {
  const mockOnDownload = vi.fn();
  const mockOnDiscardChanges = vi.fn();
  const imageUrl = 'http://example.com/image.jpg';

  it('displays the image with the correct src and alt attributes', () => {
    render(
      <ImageEditorPreview
        imageUrl={imageUrl}
        onDownload={mockOnDownload}
        onDiscardChanges={mockOnDiscardChanges}
      />
    );

    const imgElement = screen.getByAltText('Edited preview');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', imageUrl);
  });

  it('calls onDownload when the Download button is clicked', () => {
    render(
      <ImageEditorPreview
        imageUrl={imageUrl}
        onDownload={mockOnDownload}
        onDiscardChanges={mockOnDiscardChanges}
      />
    );

    const downloadButton = screen.getByRole('button', {
      name: /download edited image/i,
    });
    fireEvent.click(downloadButton);

    expect(mockOnDownload).toHaveBeenCalledTimes(1);
  });

  it('calls onDiscardChanges when the Discard Changes button is clicked', () => {
    render(
      <ImageEditorPreview
        imageUrl={imageUrl}
        onDownload={mockOnDownload}
        onDiscardChanges={mockOnDiscardChanges}
      />
    );

    const discardButton = screen.getByRole('button', {
      name: /discard changes to the image/i,
    });
    fireEvent.click(discardButton);

    expect(mockOnDiscardChanges).toHaveBeenCalledTimes(1);
  });

  it('renders the image preview heading', () => {
    render(
      <ImageEditorPreview
        imageUrl={imageUrl}
        onDownload={mockOnDownload}
        onDiscardChanges={mockOnDiscardChanges}
      />
    );

    const heading = screen.getByText('Image Preview');

    expect(heading).toBeInTheDocument();
  });
});
