import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ImageEditorTools, ImageEditorPreview } from '../../components';
import styles from './ImageEditorPage.module.css';

export const ImageEditorPage: React.FC = () => {
  const { imageId } = useParams<{ imageId: string }>();
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(400);
  const [greyscale, setGreyscale] = useState<boolean>(false);
  const [blur, setBlur] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const savedState = localStorage.getItem(`imageEditorState_${imageId}`);
    if (savedState) {
      const { width, height, greyscale, blur } = JSON.parse(savedState);
      setWidth(width);
      setHeight(height);
      setGreyscale(greyscale);
      setBlur(blur);
    }
  }, [imageId]);

  useEffect(() => {
    const url = `https://picsum.photos/id/${imageId}/${width}/${height}${
      greyscale ? '?grayscale' : ''
    }${blur ? `${greyscale ? '&' : '?'}blur=${blur}` : ''}`;
    setImageUrl(url);
    localStorage.setItem(
      `imageEditorState_${imageId}`,
      JSON.stringify({ width, height, greyscale, blur })
    );
  }, [imageId, width, height, greyscale, blur]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image_${width}x${height}${greyscale ? '_greyscale' : ''}${
      blur ? `_blur${blur}` : ''
    }.jpg`;
    link.click();
  };

  const handleDiscardChanges = () => {
    localStorage.removeItem(`imageEditorState_${imageId}`);
    setWidth(600);
    setHeight(400);
    setGreyscale(false);
    setBlur(0);
  };

  return (
    <section className={styles.editorContainer}>
      <ImageEditorTools
        width={width}
        height={height}
        greyscale={greyscale}
        blur={blur}
        onWidthChange={setWidth}
        onHeightChange={setHeight}
        onGreyscaleChange={setGreyscale}
        onBlurChange={setBlur}
      />

      <ImageEditorPreview
        imageUrl={imageUrl}
        onDiscardChanges={handleDiscardChanges}
        onDownload={handleDownload}
      />
    </section>
  );
};

export default ImageEditorPage;
