import React from 'react';
import styles from './ImageEditorPreview.module.css';

interface ImageEditorPreviewProps {
  imageUrl: string;
  onDownload: () => void;
  onDiscardChanges: () => void;
}

export const ImageEditorPreview: React.FC<ImageEditorPreviewProps> = ({
  imageUrl,
  onDownload,
  onDiscardChanges,
}) => {
  return (
    <div className={styles.imagePreview}>
      <h2>Image Preview</h2>

      <figure>
        <img src={imageUrl} alt="Edited preview" />
        <figcaption className={styles.srOnly}>
          Preview of the edited image
        </figcaption>
      </figure>

      <button onClick={onDownload} aria-label="Download edited image">
        Download Image
      </button>
      <button
        onClick={onDiscardChanges}
        aria-label="Discard changes to the image"
      >
        Discard Changes
      </button>
    </div>
  );
};

export default ImageEditorPreview;
