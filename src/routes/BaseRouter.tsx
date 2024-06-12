import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EditImagePage, HomePage } from '../pages';

export const BaseRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:imageId" element={<EditImagePage />} />
      </Routes>
    </Router>
  );
};
