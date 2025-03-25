import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Menu from './Menu.jsx';
import Tables from './Tables.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/meny" element={<Menu />} />
                    <Route path="/tables" element={<Tables />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;