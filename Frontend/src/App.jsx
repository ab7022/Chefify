import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import AddRecipe from "./Pages/AddRecipe";
import Explore from "./Pages/Explore";
import Categories from "./Pages/Categories";
import RecipeDetail from "./Pages/RecipeDetail";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/a" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
