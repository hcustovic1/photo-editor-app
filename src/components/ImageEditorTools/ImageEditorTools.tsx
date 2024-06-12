import React from 'react';
import styles from './ImageEditorTools.module.css';

interface ImageEditorToolsProps {
  width: number;
  height: number;
  greyscale: boolean;
  blur: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onGreyscaleChange: (greyscale: boolean) => void;
  onBlurChange: (blur: number) => void;
}

export const ImageEditorTools: React.FC<ImageEditorToolsProps> = ({
  width,
  height,
  greyscale,
  blur,
  onWidthChange,
  onHeightChange,
  onGreyscaleChange,
  onBlurChange,
}) => {
  return (
    <div className={styles.editorTools}>
      <h2>Editing Tools</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="width-input">Width:</label>
        <input
          id="width-input"
          type="number"
          value={width}
          onChange={(e) => onWidthChange(parseInt(e.target.value))}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="height-input">Height:</label>
        <input
          id="height-input"
          type="number"
          value={height}
          onChange={(e) => onHeightChange(parseInt(e.target.value))}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="greyscale-input">Greyscale:</label>
        <input
          id="greyscale-input"
          type="checkbox"
          checked={greyscale}
          onChange={(e) => onGreyscaleChange(e.target.checked)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="blur-input">Blur:</label>
        <input
          id="blur-input"
          type="range"
          min="0"
          max="10"
          value={blur}
          onChange={(e) => onBlurChange(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default ImageEditorTools;
