import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { HomePage } from './HomePage';
import { fetcher } from '../../utils/fetcher';
import { SWRConfig } from 'swr';
import { mockImagesListData } from '../../__mocks__';

vi.mock('../../utils/fetcher');

describe('HomePage component', () => {
  beforeEach(() => {
    (fetcher as Mock).mockResolvedValue({
      data: mockImagesListData,
      headers: new Headers(),
    });
  });

  test('renders correctly with two pagination controls and one image gallery', async () => {
    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <HomePage />
        </SWRConfig>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Image Gallery')).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Page/)).toHaveLength(2);
    expect(screen.getAllByRole('img')).toHaveLength(mockImagesListData.length);
  });

  test('shows loading state while data is getting fetched', async () => {
    (fetcher as Mock).mockReturnValue(new Promise(() => {})); // Simulate loading

    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <HomePage />
        </SWRConfig>
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows loading state while data is getting fetched', async () => {
    (fetcher as Mock).mockReturnValue(new Promise(() => {})); // Simulate loading

    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <HomePage />
        </SWRConfig>
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles error state', async () => {
    (fetcher as Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <HomePage />
        </SWRConfig>
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load images. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  test('handles next page click and updates search params', async () => {
    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <HomePage />
        </SWRConfig>
      </Router>
    );

    const nextButton = (await screen.findAllByLabelText(/next page/i))[0]; // Next button of the first PaginationControls
    fireEvent.click(nextButton);

    await waitFor(() => {
      const searchParams = new URLSearchParams(window.location.search);
      expect(searchParams.get('page')).toBe('2');
      expect(searchParams.get('limit')).toBe('25');
    });
  });

  test('handles previous page click and updates search params', async () => {
    window.history.pushState({}, '', '/?page=2&limit=25');

    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <HomePage />
        </SWRConfig>
      </Router>
    );

    const prevButton = (await screen.findAllByLabelText(/previous page/i))[0]; // Previous button of the first PaginationControls
    fireEvent.click(prevButton);

    await waitFor(() => {
      const searchParams = new URLSearchParams(window.location.search);
      expect(searchParams.get('page')).toBe('1');
      expect(searchParams.get('limit')).toBe('25');
    });
  });

  test('handles page size change and updates search params', async () => {
    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
          <HomePage />
        </SWRConfig>
      </Router>
    );

    const select = (await screen.findAllByDisplayValue('25'))[0];
    fireEvent.change(select, { target: { value: '50' } });

    await waitFor(() => {
      const searchParams = new URLSearchParams(window.location.search);
      expect(searchParams.get('page')).toBe('1');
      expect(searchParams.get('limit')).toBe('50');
    });
  });
});
