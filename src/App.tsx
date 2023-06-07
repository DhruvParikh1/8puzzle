/* file-name: src\App.tsx */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PuzzleBoard from './components/PuzzleBoard';
import About from './components/About';

const App: React.FC = () => {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<PuzzleBoard />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
