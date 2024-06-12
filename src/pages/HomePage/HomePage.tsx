import { Link } from 'react-router-dom';
import { ImagePreview } from '../../components';
import { Image } from '../../types';
import { useImages } from '../../hooks/useImages';
import { useState } from 'react';

export function HomePage() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useImages(page, 20);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isError) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div>
      {data?.data.map((image: Image) => (
        <div key={image.id}>
          <Link to={`/edit/${image.id}`} className="linkWrapper">
            <ImagePreview
              imageUrl={image.download_url}
              authorName={image.author}
            />
          </Link>
        </div>
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}
