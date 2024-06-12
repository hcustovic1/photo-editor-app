import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ImageEditorPage, HomePage } from '../pages';

export const BaseRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit/:imageId" element={<ImageEditorPage />} />
    </Routes>
  );
};
