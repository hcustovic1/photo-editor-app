import styles from './HomePage.module.css';
import { ImageGallery, Loading, PaginationControls } from '../../components';
import { useImages } from '../../hooks/useImages';
import { useState } from 'react';

// TODO: fix type and jsdoc
export function HomePage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const { data, isLoading } = useImages(page, limit);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PaginationControls
        currentPage={page}
        onNextPageClick={handleNextPage}
        onPreviousPageClick={handlePreviousPage}
        currentLimit={limit}
        onPageSizeChange={(x: number) => setLimit(x)}
      />
      <div className={styles.imageGalleryContainer}>
        <ImageGallery images={data?.data || []} />
      </div>
      <PaginationControls
        currentPage={page}
        onNextPageClick={handleNextPage}
        onPreviousPageClick={handlePreviousPage}
        currentLimit={limit}
        onPageSizeChange={(x: number) => setLimit(x)}
      />
    </>
  );
}
