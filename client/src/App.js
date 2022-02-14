import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About/About.jsx';
import Create from './components/vGameCreate/Create.jsx';
import Details from './components/Detail/Details.jsx';
import Home from './components/Home/Home.jsx';
import Landing from './components/LandingPage/Landing.jsx';
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
          {<NavBar/>}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create_game' element={<Create />} />
          <Route path='/videogame/:id' element={<Details />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
    </BrowserRouter>  
    </>
  );
};

export default App;
