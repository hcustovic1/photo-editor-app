import styles from './HomePage.module.css';
import { ImageGallery, Loading, PaginationControls } from '../../components';
import { useImages } from '../../hooks/useImages';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '25');

  const { data, isLoading } = useImages(page, limit);

  const handleNextPage = () => {
    setSearchParams({ page: (page + 1).toString(), limit: limit.toString() });
  };

  const handlePreviousPage = () => {
    setSearchParams({
      page: Math.max(page - 1, 1).toString(),
      limit: limit.toString(),
    });
  };

  const handlePageSizeChange = (newLimit: number) => {
    setSearchParams({ page: '1', limit: newLimit.toString() });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
        onPageSizeChange={handlePageSizeChange}
      />

      <div className={styles.imageGalleryContainer}>
        <ImageGallery images={data?.data || []} />
      </div>

      <PaginationControls
        currentPage={page}
        onNextPageClick={handleNextPage}
        onPreviousPageClick={handlePreviousPage}
        currentLimit={limit}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
}
