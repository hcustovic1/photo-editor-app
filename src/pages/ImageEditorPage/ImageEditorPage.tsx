import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ImageEditorTools, ImageEditorPreview } from '../../components';
import {
  constructImageUrl,
  getImageEditorStateFromParams,
  updateSearchParams,
} from '../../utils/image-utils';
import styles from './ImageEditorPage.module.css';

export const ImageEditorPage: React.FC = () => {
  const { imageId = '' } = useParams<{ imageId: string }>();
  const [searchParams] = useSearchParams();

  const initialState = getImageEditorStateFromParams(searchParams);

  const [width, setWidth] = useState<number>(initialState.width);
  const [height, setHeight] = useState<number>(initialState.height);
  const [greyscale, setGreyscale] = useState<boolean>(initialState.greyscale);
  const [blur, setBlur] = useState<number>(initialState.blur);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const newImageUrl = constructImageUrl(imageId, {
      width,
      height,
      greyscale,
      blur,
    });
    setImageUrl(newImageUrl);
    updateSearchParams({ width, height, greyscale, blur });
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
    setWidth(600);
    setHeight(400);
    setGreyscale(false);
    setBlur(0);
    updateSearchParams({ width: 600, height: 400, greyscale: false, blur: 0 });
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
