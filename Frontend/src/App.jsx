import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import Categories from "./Pages/Categories";
import RecipeDetail from "./Pages/RecipeDetail";
import AiSearch from "./Pages/AiSearch";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div>
      <Router>
        <Analytics/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AiSearch" element={<AiSearch />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
