import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Favoritos from './favoritos';
import './index.css';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
    </Routes>
  );
}

export default App;