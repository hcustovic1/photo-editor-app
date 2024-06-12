import React from 'react';
import styles from './ImagePreview.module.css';

interface ImagePreviewProps {
  imageUrl: string;
  authorName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  authorName,
}) => {
  return (
    <figure className={styles.imagePreview}>
      <img src={imageUrl} alt={`Image by ${authorName}`} />
      <figcaption className={styles.authorName}>{authorName}</figcaption>
    </figure>
  );
};

export default ImagePreview;
