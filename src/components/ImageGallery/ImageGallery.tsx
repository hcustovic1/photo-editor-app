import React from 'react';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import { Image } from '../../types';
import styles from './ImageGallery.module.css';
import { Link } from 'react-router-dom';

interface ImageGalleryProps {
  images: Image[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <section className={styles.gallery} aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className={styles.galleryHeading}>
        Image Gallery
      </h2>
      <div className={styles.galleryGrid}>
        {images.map((image) => (
          <figure key={image.id} className={styles.galleryItem}>
            <Link to={`/edit/${image.id}`} className={styles.linkWrapper}>
              <ImagePreview
                imageUrl={image.download_url}
                authorName={image.author}
              />
            </Link>
          </figure>
        ))}
      </div>
    </section>
  );
};
