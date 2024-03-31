import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import CategoryCard from "../components/CategoryCard";

import { Link } from "react-router-dom";

export default function Categories() {
  const [response, setResponse] = useState({ categories: [] });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setResponse({ categories: categories.data.categories });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // empty dependency array

  useEffect(() => {
    console.log(response);
  }, [response]); // log the updated state

  const handleCategoryClick = async (categoryName) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  useEffect(() => {
    // Automatically select "Beef" when nothing is selected
    if (selectedCategory === null) {
      handleCategoryClick("Beef");
    }
  }, [selectedCategory]);
  return (
    <div className="glassmorphism-bg">
      <div className="pt-6 md:pt-52 p-3 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 font-medium text-xl">Good Morning</p>
          <h1 className="text-2xl font-bold mb-1">Discover New Recipes</h1>
          <div className="mt-3 w-full flex flex-row items-center">
            <input
              type="text"
              placeholder="Search for recipes"
              className="border py-3 rounded-md p-4 w-full focus:outline-none"
            />
            <div className="ml-1 p-3 px-5 bg-orange-500 rounded hover:bg-orange-600">
              <FontAwesomeIcon icon={faSearch} color="white" />
            </div>
          </div>

          <section className="mt-4 glassmorphism-bg p-4 ">
            <h2 className="text-lg font-bold mb-4">
              What are you looking for?
            </h2>
            <div className="flex flex-row text-sm overflow-x-auto">
              {[...response.categories]
                .filter(
                  (category) =>
                    category.strCategory !== "Pork" &&
                    category.strCategory !== "Miscellaneous" &&
                    category.strCategory !== "Goat" 
                )
                .map((category, index) => (
                  <CategoryCard
                    key={index}
                    category={category}
                    isSelected={selectedCategory === category.strCategory}
                    onClick={handleCategoryClick}
                  />
                ))}
            </div>
          </section>

          <section className="mt-8 glassmorphism-bg p-2 mb-20">
            {recipes.length > 0 && (
              <div>
                <h3 className="text-lg font-bold m-2 text-center items-center text-orange-500">
                  Recipes for {selectedCategory}:
                </h3>
                <div className="flex flex-wrap justify-around">
                  {recipes.map((recipe, index) => (
                    <Link
                      to={`/recipe/${recipe.idMeal}`}
                      key={index}
                      className="flex flex-col mb-2 bg-gray-100 hover:bg-gray-200 shadow-lg rounded p-2 w-40 border-e-2 sm:w-48 sm:flex-basis-48 md:w-52 md:flex-basis-48 lg:w-60 lg:flex-basis-24 pb-8"
                    >
                      <img
                        src={recipe.strMealThumb}
                        alt="loading"
                        className="w-full h-32 rounded-lg mb-2 object-cover"
                      />
                      <p className="text-sm font-medium underline text-center max-w-full">
                        {recipe.strMeal}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
