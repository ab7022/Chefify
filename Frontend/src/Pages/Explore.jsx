import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faVideo } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";

export default function Explore() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [response, setResponse] = useState({ meals: [] });
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const GetRandomMeal = async () => {
    try {
      const result = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setResponse(result.data);
      if (result.data.meals.length > 0) {
        setSelectedRecipe(result.data.meals[0]);
        setShowFullInstructions(false); // Reset to truncate instructions
      }
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching random recipe:", error);
    }
  };

  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  return (
    <div className="glassmorphism-bg min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Explore New Recipes
        </h1>

        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search for recipes"
            className="flex-1 border p-3 rounded-md focus:outline-none"
          />
          <button
            className="ml-2 p-3 px-5 bg-orange-500 rounded hover:bg-orange-600 text-white"
            onClick={GetRandomMeal}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {selectedRecipe && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              {selectedRecipe.strMeal}
            </h3>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="mb-4 rounded-lg w-full"
            />
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Category:</span>{" "}
              {selectedRecipe.strCategory}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Area:</span>{" "}
              {selectedRecipe.strArea}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Tags:</span>{" "}
              {selectedRecipe.strTags}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Instructions:</span>{" "}
              {showFullInstructions
                ? selectedRecipe.strInstructions
                : `${selectedRecipe.strInstructions.slice(0, 40)}...`}
              {!showFullInstructions && (
                <button
                  className="text-orange-500 hover:underline focus:outline-none"
                  onClick={toggleInstructions}
                >
                  Read More
                </button>
              )}
            </p>
            <a
              href={selectedRecipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-orange-500 hover:underline"
            >
              <FontAwesomeIcon icon={faVideo} className="mr-2" />
              Watch on YouTube
            </a>
          </div>
        )}

        <button
          className="bg-orange-500 text-white border w-full py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mt-6 hover:bg-orange-600"
          aria-label="Suggest Me"
          onClick={GetRandomMeal}
        >
          Suggest Me a Recipe
        </button>

      </div>

      <Footer />
    </div>
  );
}
