import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';

function App() {

  return (
    <div>
        <Router>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/a" element={<Dashboard />} />

          </Routes>
        </Router>
    </div>
  )
}

export default App
