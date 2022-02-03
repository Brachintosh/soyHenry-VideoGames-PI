import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './components/vGameCreate/Create.jsx';
import Details from './components/Detail/Details.jsx';
import Home from './components/Home/Home.jsx';
import Landing from './components/LandingPage/Landing.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create_game' element={<Create />} />
          <Route path='/videogame/:id' element={<Details />} />
        </Routes>
    </BrowserRouter>  
    </>
  );
};

export default App;
