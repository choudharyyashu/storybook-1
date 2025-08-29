import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AppHeader: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="header-nav">
            <div className="logo">
                <img src="/favicon.ico" alt="React Logo" className="app-logo" />
                BrainyLingo
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/dailyquiz">Daily Quiz</Link></li>
                <li><Link to="/genre" className={location.pathname.startsWith('/genre') ? 'active' : ''}>Genre</Link></li>
            </ul>
            <button className="sign-out-button">Sign Out</button>
        </nav>
    );
};

export default AppHeader;