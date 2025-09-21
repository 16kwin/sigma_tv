import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Menu from './components/menu';
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
document.documentElement.style.setProperty('--window-width', `${windowWidth}px`);
document.documentElement.style.setProperty('--window-height', `${windowHeight}px`);
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;