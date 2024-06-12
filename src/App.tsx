import { useState } from 'react';
import './App.css';
import { useImages } from './hooks/useImages';
import { Image } from './types';

function App() {
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading } = useImages(page, 20);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <div>
        {data &&
          data?.data.map((item: Image) => (
            <div key={item.id}>
              <img
                loading="lazy"
                height={200}
                width={200}
                src={item.download_url}
                alt={item.download_url}
              />
            </div>
          ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  );
}

export default App;
