import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListPage.css'; // Import the CSS file

interface Story {
  _id: string;
  Title: string;
  Image: string[];
  Status: string;
}

const ListPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const storiesPerPage = 8;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('https://mxpertztestapi.onrender.com/api/sciencefiction');
        setStories(response.data);
      } catch (err) {
        setError('Failed to fetch stories.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter(story => {
    if (filter === 'All') return true;
    return story.Status === filter;
  });

  // Pagination logic
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);

  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return <div className="loading-message">Loading stories...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="list-page-container">
      <div className="header-section">
        <h1 className="main-title">Science Fiction Stories</h1>
        <div className="filter-buttons">
          <button className={`filter-button ${filter === 'New' ? 'active' : ''}`} onClick={() => setFilter('New')}>New</button>
          <button className={`filter-button ${filter === 'In Progress' ? 'active' : ''}`} onClick={() => setFilter('In Progress')}>In Progress</button>
          <button className={`filter-button ${filter === 'Completed' ? 'active' : ''}`} onClick={() => setFilter('Completed')}>Completed</button>
          <button className={`filter-button ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>Clear All</button>
        </div>
      </div>
      <div className="card-grid">
        {currentStories.map((story) => (
          <Link to={`/genre/${story._id}`} key={story._id} className="card-link">
            <div className="card">
              {story.Image && story.Image.length > 0 && (
                <img
                  src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}
                  alt={story.Title}
                  className="card-image"
                />
              )}
              <h2 className="card-title">{story.Title}</h2>
              <p className="card-status">{story.Status}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ListPage;