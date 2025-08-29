import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Genre from './components/Genre';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <nav className="header-nav">
                    <div className="logo">BrainyLingo</div>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/dailyquiz">Daily Quiz</Link></li>
                        <li><Link to="/genre">Genre</Link></li>
                    </ul>
                    <button className="sign-out-button">Sign Out</button>
                </nav>
                <Routes>
                    <Route path="/genre/*" element={<Genre />} />
                    {/* Static routes for Home, Leaderboard, Daily Quiz, Sign Out */}
                    <Route path="/" element={<Link to="/genre">Go to Genre</Link>} />
                    <Route path="/leaderboard" element={<h1>Leaderboard Page</h1>} />
                    <Route path="/dailyquiz" element={<h1>Daily Quiz Page</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;