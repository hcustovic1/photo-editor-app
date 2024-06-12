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
      <img src={imageUrl} alt="Edited preview" />
      <button onClick={onDownload}>Download Image</button>
      <button onClick={onDiscardChanges}>Discard Changes</button>
    </div>
  );
};

export default ImageEditorPreview;
