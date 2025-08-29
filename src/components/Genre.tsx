import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListPage from './Genre/story-list-page/ListPage';
import StoryContent from './Genre/story-content/StoryContent';

const Genre: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path=":id" element={<StoryContent />} />
    </Routes>
  );
};

export default Genre;