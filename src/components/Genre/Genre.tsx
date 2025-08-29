import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ListPage from './story-list-page/ListPage';
import StoryContent from './story-content/StoryContent';
import './Genre.css';

const Genre: React.FC = () => {
  return (
    <div className="genre-container">
      <h1>Welcome to Genre Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/genre/list">Story List</Link>
          </li>
          <li>
            <Link to="/genre/content">Story Content</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="list" element={<ListPage />} />
        <Route path="content" element={<StoryContent />} />
      </Routes>
    </div>
  );
};

export default Genre;