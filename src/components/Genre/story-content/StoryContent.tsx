import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StoryContent.css'; // Import the CSS file

interface StoryContentData {
  Storyadvenure: {
    Storytitle: string;
    content: {
      Storyimage: string[];
      Paragraph: string[];
      _id: string;
    }[];
  };
  _id: string;
  Title: string;
  Image: string[];
  Status: string;
  Wordexplore: {
    Storytitle: string;
    Storyttext: string;
    Storyimage: string[];
    Storyitext: string;
    Synonyms: string;
    Antonyms: string;
    Noun: string;
    _id: string;
  }[];
  Brainquest: {
    Question: string;
    Option: string[];
    Answer: string;
    _id: string;
  }[];
}

const StoryContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<StoryContentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'wordExplorer' | 'storyAdventure' | 'brainQuest'>('wordExplorer');
  const [currentWordExplorerIndex, setCurrentWordExplorerIndex] = useState<number>(0);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`);
        setStory(response.data);
      } catch (err) {
        setError('Failed to fetch story content.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStory();
    }
  }, [id]);

  if (loading) {
    return <div className="loadingError">Loading story content...</div>;
  }

  if (error) {
    return <div className="loadingError">Error: {error}</div>;
  }

  if (!story) {
    return <div className="loadingError">Story not found.</div>;
  }

  return (
    <div className="container">
      <h1 className="title">{story.Title}</h1>
      <div className="tabsContainer">
        <button
          className={activeTab === 'wordExplorer' ? 'activeTabButton' : 'tabButton'}
          onClick={() => setActiveTab('wordExplorer')}
        >
          Word Explorer
        </button>
        <button
          className={activeTab === 'storyAdventure' ? 'activeTabButton' : 'tabButton'}
          onClick={() => setActiveTab('storyAdventure')}
        >
          Story Adventure
        </button>
        <button
          className={activeTab === 'brainQuest' ? 'activeTabButton' : 'tabButton'}
          onClick={() => setActiveTab('brainQuest')}
        >
          Brain Quest
        </button>
      </div>

      <div className="tabContent">
        {activeTab === 'wordExplorer' && (
          <div className="tabPanel wordExplorerPanel">
            <h2 className="tabPanelTitle">Word Explorer</h2>
            {story.Wordexplore.length > 0 && (
              <div className="wordExplorerLayout">
                <div className="wordExplorerMainContent">
                  <div className="currentWordExplorerItem">
                    <div className="navigation-buttons">
                      <button onClick={() => setCurrentWordExplorerIndex(prev => Math.max(0, prev - 1))} disabled={currentWordExplorerIndex === 0}>&lt;</button>
                    </div>
                    <div className="wordItem">
                      <h3 className="wordTitle">{story.Wordexplore[currentWordExplorerIndex].Storytitle}</h3>
                      <p className="wordText">{story.Wordexplore[currentWordExplorerIndex].Storyttext}</p>
                      {story.Wordexplore[currentWordExplorerIndex].Storyimage && story.Wordexplore[currentWordExplorerIndex].Storyimage.length > 0 && (
                        <img src={`https://ik.imagekit.io/dev24/${story.Wordexplore[currentWordExplorerIndex].Storyimage[0]}`} alt={story.Wordexplore[currentWordExplorerIndex].Storytitle} className="wordImage" />
                      )}
                      <p className="wordDetail">Synonyms: {story.Wordexplore[currentWordExplorerIndex].Synonyms}</p>
                      <p className="wordDetail">Antonyms: {story.Wordexplore[currentWordExplorerIndex].Antonyms}</p>
                      <p className="wordDetail">Noun: {story.Wordexplore[currentWordExplorerIndex].Noun}</p>
                    </div>
                    <div className="navigation-buttons">
                      <button onClick={() => setCurrentWordExplorerIndex(prev => Math.min(story.Wordexplore.length - 1, prev + 1))} disabled={currentWordExplorerIndex === story.Wordexplore.length - 1}>&gt;</button>
                    </div>
                  </div>
                </div>
                <div className="wordExplorerThumbnails">
                  <div className="remainingWordExplorerItems">
                    {story.Wordexplore.map((word, index) => (
                      <div key={index} className={`wordItemThumbnail ${index === currentWordExplorerIndex ? 'activeThumbnail' : ''}`} onClick={() => setCurrentWordExplorerIndex(index)}>
                        <img src={`https://ik.imagekit.io/dev24/${word.Storyimage[0]}`} alt={word.Storytitle} className="wordThumbnailImage" />
                        <p className="wordThumbnailTitle">{word.Storytitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'storyAdventure' && (
          <div className="tabPanel">
            <h2 className="tabPanelTitle">Story Adventure</h2>
            <h3 className="storyAdventureTitle">{story.Storyadvenure.Storytitle}</h3>
            {story.Storyadvenure.content.map((paragraph, index) => (
              <div key={index} className="storyParagraph">
                {paragraph.Storyimage && paragraph.Storyimage.length > 0 && (
                  <img src={`https://ik.imagekit.io/dev24/${paragraph.Storyimage[0]}`} alt={`Story Image ${index}`} className="storyImage" />
                )}
                {paragraph.Paragraph.map((p, pIndex) => (
                  <p key={pIndex} className="storyText">{p}</p>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'brainQuest' && (
          <div className="tabPanel">
            <h2 className="tabPanelTitle">Brain Quest</h2>
            {story.Brainquest.map((question, index) => (
              <div key={index} className="questionItem">
                <h3 className="questionText">{question.Question}</h3>
                <ul className="optionsList">
                  {question.Option.map((option, optIndex) => (
                    <li key={optIndex} className="optionItem">{option}</li>
                  ))}
                </ul>
                <p className="answerText">Answer: {question.Answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryContent;