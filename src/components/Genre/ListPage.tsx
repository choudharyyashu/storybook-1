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

  if (loading) {
    return <div className="loading-message">Loading stories...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="header">Science Fiction Stories</h1>
      <div className="cardGrid">
        {stories.map((story) => (
          <Link to={`/genre/${story._id}`} key={story._id} className="cardLink">
            <div className="card">
              {story.Image && story.Image.length > 0 && (
                <img
                  src={`https://ik.imagekit.io/dev24/${story.Image[0]}`}
                  alt={story.Title}
                  className="cardImage"
                />
              )}
              <h2 className="cardTitle">{story.Title}</h2>
              <p className="cardStatus">Status: {story.Status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListPage;