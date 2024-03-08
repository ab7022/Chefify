// Import necessary dependencies and components
import React from "react";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../signin.css';

const Profile = () => {
  // Placeholder data for user, likes, favorites, and user recipes
  const user = {
    id: 1,
    username: "Abdul Bayees",
    email: "bayees1@gmail.com",
  };

  // Placeholder data for likes, favorites, and user recipes
  const likes = ["Like 1", "Like 2", "Like 3"];
  const favorites = ["Favorite 1", "Favorite 2", "Favorite 3"];
  const userRecipes = ["Recipe 1", "Recipe 2", "Recipe 3"];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">

      <Navbar />

      <div className="container mx-auto p-6 md:mt-28 md:max-w-4xl flex flex-col justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex items-center justify-between">
          <div className="bg-gray-500 p-4 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full">
            <BsPerson />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-orange-400">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <BsPerson className="text-3xl text-gray-600" />
        </div>

        <div className="bg-white p-4 rounded shadow-md mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-orange-400 flex items-center">
              <AiOutlineHeart className="mr-2" />
              Your Likes
            </h2>
          </div>
          <ul className="list-disc pl-6">
            {likes.map((like, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {like}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow-md mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-orange-400 flex items-center">
              <AiOutlineStar className="mr-2" />
              Your Favorites
            </h2>
          </div>
          <ul className="list-disc pl-6">
            {favorites.map((favorite, index) => (
              <li key={index} className="text-gray-700 mb-2">
                {favorite}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-2 text-orange-400">Your Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map((recipe, index) => (
              <div key={index} className="bg-orange-50 p-4 rounded-sm shadow-md">
                <h3 className="text-lg font-bold mb-2">{recipe}</h3>
                {/* Add more details or buttons as needed */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
