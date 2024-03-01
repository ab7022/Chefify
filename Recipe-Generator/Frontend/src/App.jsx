import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './Pages/LandingPage';

function App() {

  return (
    <div>
        <Router>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
