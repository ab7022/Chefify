import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';

function App() {

  return (
    <div>
        <Router>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/a" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          </Routes>
        </Router>
    </div>
  )
}

export default App
