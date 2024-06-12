import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { PaginationControls } from './PaginationControls';

describe('PaginationControls component', () => {
  test('renders correctly', () => {
    render(
      <PaginationControls
        onPreviousPageClick={vi.fn()}
        onNextPageClick={vi.fn()}
        onPageSizeChange={vi.fn()}
        currentPage={1}
        currentLimit={25}
      />
    );

    expect(screen.getByText(/page 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/previous page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select items per page/i)).toBeInTheDocument();
  });

  test('calls onPreviousPageClick when Previous button is clicked', () => {
    const onPreviousPageClick = vi.fn();
    render(
      <PaginationControls
        onPreviousPageClick={onPreviousPageClick}
        onNextPageClick={vi.fn()}
        onPageSizeChange={vi.fn()}
        currentPage={2}
        currentLimit={25}
      />
    );

    fireEvent.click(screen.getByLabelText(/previous page/i));
    expect(onPreviousPageClick).toHaveBeenCalled();
  });

  test('calls onNextPageClick when Next button is clicked', () => {
    const onNextPageClick = vi.fn();
    render(
      <PaginationControls
        onPreviousPageClick={vi.fn()}
        onNextPageClick={onNextPageClick}
        onPageSizeChange={vi.fn()}
        currentPage={1}
        currentLimit={25}
      />
    );

    fireEvent.click(screen.getByLabelText(/next page/i));
    expect(onNextPageClick).toHaveBeenCalled();
  });

  test('calls onPageSizeChange when page size is changed', () => {
    const onPageSizeChange = vi.fn();
    render(
      <PaginationControls
        onPreviousPageClick={vi.fn()}
        onNextPageClick={vi.fn()}
        onPageSizeChange={onPageSizeChange}
        currentPage={1}
        currentLimit={25}
      />
    );

    fireEvent.change(screen.getByLabelText(/select items per page/i), {
      target: { value: '50' },
    });
    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });

  test('disables Previous button on the first page', () => {
    render(
      <PaginationControls
        onPreviousPageClick={vi.fn()}
        onNextPageClick={vi.fn()}
        onPageSizeChange={vi.fn()}
        currentPage={1}
        currentLimit={25}
      />
    );

    expect(screen.getByLabelText(/previous page/i)).toBeDisabled();
  });

  test('enables Previous button when not on the first page', () => {
    render(
      <PaginationControls
        onPreviousPageClick={vi.fn()}
        onNextPageClick={vi.fn()}
        onPageSizeChange={vi.fn()}
        currentPage={2}
        currentLimit={25}
      />
    );

    expect(screen.getByLabelText(/previous page/i)).not.toBeDisabled();
  });
});
