import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { ImageGallery } from './ImageGallery';
import { mockImagesListData } from '../../__mocks__';

describe('ImageGallery Component', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <ImageGallery images={mockImagesListData} />
      </Router>
    );

    expect(
      screen.getByRole('heading', { name: /image gallery/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(mockImagesListData.length);
    expect(screen.getAllByRole('img')).toHaveLength(mockImagesListData.length);
  });

  test('renders images with correct alt text', () => {
    render(
      <Router>
        <ImageGallery images={mockImagesListData} />
      </Router>
    );

    mockImagesListData.forEach((image) => {
      expect(
        screen.getByAltText(`Image by ${image.author}`)
      ).toBeInTheDocument();
    });
  });
});
