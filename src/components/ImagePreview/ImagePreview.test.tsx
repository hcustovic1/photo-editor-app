import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImagePreview } from './ImagePreview';
import { describe, expect, test } from 'vitest';

describe('ImagePreview', () => {
  const mockImageUrl = 'https://via.placeholder.com/150';
  const mockAuthor = 'John Doe';

  test('renders the image with the correct src and alt text', () => {
    render(<ImagePreview imageUrl={mockImageUrl} authorName={mockAuthor} />);

    const imgElement = screen.getByAltText(`Image by ${mockAuthor}`);

    expect(imgElement).toHaveAttribute('src', mockImageUrl);
  });

  test('renders the author name', () => {
    render(<ImagePreview imageUrl={mockImageUrl} authorName={mockAuthor} />);

    const figcaptionElement = screen.getByText(mockAuthor);

    expect(figcaptionElement).toBeInTheDocument();
  });
});
