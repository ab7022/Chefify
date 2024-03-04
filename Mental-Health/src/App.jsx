// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Feeling from "./pages/Feeling";

function App() {
  return (
    <div className="bg-yellow-50 p-2 ">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/feeling" element={<Feeling />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
