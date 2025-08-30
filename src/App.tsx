import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Genre from './components/Genre';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Genre />} />
                    <Route path="/genre/*" element={<Genre />} />
                    {/* Static routes for Home, Leaderboard, Daily Quiz, Sign Out */}
                    <Route path="/leaderboard" element={<h1>Leaderboard Page</h1>} />
                    <Route path="/dailyquiz" element={<h1>Daily Quiz Page</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;