// RecipeDetail.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        setRecipeDetail(data.meals[0] || null);
      } catch (error) {
        console.error("Error fetching recipe detail:", error);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (!recipeDetail) {
    return (
      <div className="glassmorphism-bg min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipeDetail[`strIngredient${i}`];
      const measure = recipeDetail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(
          <div key={i} className="flex flex-col items-center mr-4">
            <div className="bg-gray-200 p-2 rounded-full">
                 <img
              src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
              alt={ingredient}
              className="max-w-14 max-h-14 mr-2 rounded-full object-contain "
            />
            </div>
           
            <div className="flex flex-col">
              <span className="font-semibold">{ingredient}</span>
              <span className="text-gray-500 ml-2">{measure}</span>
            </div>
          </div>
        );
      }
    }

    return ingredients;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 md:mt-24">
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h1 className="text-3xl font-semibold text-yellow-600 mb-4">
            {recipeDetail.strMeal}
          </h1>
          <img
            src={recipeDetail.strMealThumb}
            alt={recipeDetail.strMeal}
            className="w-full mb-6 rounded-lg shadow-md max-w-2xl max-h-72"
          />
          <div className="text-gray-700">
            <p>
              <strong>Name:</strong> {recipeDetail.strMeal || "Not available"}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {recipeDetail.strCategory || "Not available"}
            </p>
            <p>
              <strong>Area:</strong> {recipeDetail.strArea || "Not available"}
            </p>
            <p>
              <strong>Tags:</strong> {recipeDetail.strTags || "Not available"}
            </p>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-600">
                Ingredients:
              </h2>
              <div className="flex overflow-x-auto">{renderIngredients()}</div>
            </div>
            <p>
              <strong>Description:</strong>{" "}
              {recipeDetail.strInstructions || "Not available"}
            </p>
            <p>
              <strong>YouTube Link:</strong>{" "}
              {recipeDetail.strYoutube ? (
                <a
                  href={recipeDetail.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Watch Video
                </a>
              ) : (
                "Not available"
              )}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
