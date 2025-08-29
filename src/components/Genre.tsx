import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListPage from './Genre/ListPage';
import StoryContent from './Genre/StoryContent';

const Genre: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path=":id" element={<StoryContent />} />
    </Routes>
  );
};

export default Genre;