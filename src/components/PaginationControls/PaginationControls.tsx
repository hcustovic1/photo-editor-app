import React from 'react';
import styles from './PaginationControls.module.css';

interface PaginationControlsProps {
  onPreviousPageClick: () => void;
  onNextPageClick: () => void;
  onPageSizeChange: (x: number) => void;
  currentPage: number;
  currentLimit: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  onPreviousPageClick,
  onNextPageClick,
  onPageSizeChange,
  currentPage,
  currentLimit,
}) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.pageControls}>
        <button
          onClick={onPreviousPageClick}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span className={styles.currentPageSpan}>Page {currentPage}</span>
        <button onClick={onNextPageClick} aria-label="Next page">
          Next
        </button>
      </div>
      <div className={styles.pageSizeControls}>
        <label htmlFor="pageSize">Items per page:</label>
        <select
          id="pageSize"
          value={currentLimit}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Select items per page"
          data-testid="e2e-pagination-select"
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};
