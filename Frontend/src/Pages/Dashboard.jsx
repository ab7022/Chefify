import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faVideo } from "@fortawesome/free-solid-svg-icons";

import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { apiEndpointsCategory, apiEndpointsSearch } from "../components/APIEndpoint";
import SkeletonCard from "../components/Skeleton";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Greeting from "./Greeting";
export default function Dashboard() {
  const navigate = useNavigate();
  const [response, setResponse] = useState({ categories: [] });
  const [apiDataSearch, setApiDataSearch] = useState([]);
  const [apiDataCategory, setApiDataCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [randomdetail, setrandomdetail] = useState({ meals: [] });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when an image is loaded
  };
  const GetRandomMeal = async () => {
    try {
      const result = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setrandomdetail(result.data);
      if (result.data.meals.length > 0) {
        setSelectedRecipe(result.data.meals[0]);
        setShowFullInstructions(false); // Reset to truncate instructions
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
    }
  };

  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  useEffect(() => {
    const fetchRandomData = async () => {
      setLoading(true);
      try {
        const randomEndpoint = getRandomEndpointCategory();
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/${randomEndpoint}`
        );
        setApiDataCategory(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomData();
  }, []);

  useEffect(() => {
    const fetchRandomData = async () => {
      setLoading(true);
      try {
        const randomEndpoint = getRandomEndpointSearch();
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/${randomEndpoint}`
        );
        setApiDataSearch(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomData();
  }, []);

  const getRandomEndpointSearch = () => {
    const endpointKeys = Object.keys(apiEndpointsSearch);
    const randomKey =
      endpointKeys[Math.floor(Math.random() * endpointKeys.length)];
    return apiEndpointsSearch[randomKey];
  };

  const getRandomEndpointCategory = () => {
    const endpointKeys = Object.keys(apiEndpointsCategory);
    const randomKey =
      endpointKeys[Math.floor(Math.random() * endpointKeys.length)];
    return apiEndpointsCategory[randomKey];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categories = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setResponse({ categories: categories.data.categories });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState();
  const [recipes, setRecipes] = useState([]);

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

  return (
    <div className="glassmorphism-bg">
      {loading ? (
        <div> 
          {/* <Skeleton count={20}/> */}
          <SkeletonCard />

        </div>
        // <p>Loading</p>
      ) : (
        <div className="pt-6 md:pt-52 p-3 bg-gray-100 min-h-screen">
          <Navbar />
          <div className="max-w-3xl mx-auto">
            {/* <p className="text-gray-700 font-medium text-xl">Good Morning</p> */}
            <Greeting/>
            <h1 className="text-2xl font-bold mb-1">Discover New Recipes</h1>
            <div className="mt-3 w-full flex flex-row items-center">
              <input
                type="text"
                placeholder="Search for recipes"
                className="border py-3 rounded-md p-4 w-full focus:outline-none" onClick={() => {navigate("/explore")}}
              />
              <div className="ml-1 p-3 px-5 bg-orange-500 rounded hover:bg-orange-600">
                <FontAwesomeIcon icon={faSearch} color="white" />
              </div>
            </div>

            <section className="mt-4 glassmorphism-bg p-3">
              <h2 className="text-lg font-bold mb-4">
                What are you looking for?
              </h2>
              <div className="flex flex-row text-sm overflow-x-auto">
                {[...response.categories]
                  .filter(
                    (category) =>
                      category.strCategory !== "Pork" &&
                      category.strCategory !== "Miscellaneous"
                  )
                  .map((category, index) => (
                    <div
                      key={index}
                      className="mr-4 min-w-16 min-h-16 flex items-center"
                    >
                      <div className="flex flex-col">
                        <div
                          className={`rounded-full shadow-lg bg-slate-50 p-1 cursor-pointer ${
                            selectedCategory === category.strCategory
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          onClick={() => {
                            navigate("/categories");
                            handleCategoryClick(category.strCategory);
                          }}
                        >
                          <img
                            src={category.strCategoryThumb}
                            alt=""
                            className="rounded-full min-w-14 min-h-14 object-cover"
                          />
                        </div>
                        <p className="text-center p-1.5">
                          {category.strCategory}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {recipes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mt-4">
                    Recipes for {selectedCategory}:
                  </h3>
                  <ul>
                    {recipes.map((recipe, index) => (
                      <li key={index}>{recipe.strMeal}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="mt-8 glassmorphism-secondary p-3 bg-gray-50">
              <h2 className="text-lg font-bold mb-2">Explore Favorites</h2>
              <div className="flex flex-row flex-nowrap overflow-x-auto gap-2 mb-1">
                {apiDataSearch.map((recipe, index) => (
                  <Link to={`/recipe/${recipe.idMeal}`} key={index}>
                    <RecipeCard
                      image={recipe.strMealThumb}
                      name={recipe.strMeal}
                      category={recipe.strCategory}
                      area={recipe.strArea}
                      handleImageLoad={handleImageLoad}
                    />
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-8 glassmorphism-secondary p-3 bg-gray-50">
              <h2 className="text-lg font-bold mb-2">Best Dishes for you</h2>
              <div className="flex flex-row flex-nowrap overflow-x-auto gap-2 mb-1">
                {apiDataCategory.map((recipe, index) => (
                  <Link to={`/recipe/${recipe.idMeal}`} key={index}>
                    <RecipeCard
                      image={recipe.strMealThumb}
                      name={recipe.strMeal}
                      category={recipe.strCategory}
                      handleImageLoad={handleImageLoad}

                    />
                  </Link>
                ))}
              </div>
            </section>

            <div className="glassmorphism-secondary flex flex-col justify-center p-4 mt-8 mb-24">
              <p className="text-lg p-2 font-semibold">
                Not sure what you want to cook? Get personalized suggestions!
              </p>
              <button
                className="bg-orange-500 text-white border w-full py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mb-4 hover:bg-orange-600"
                aria-label="Suggest Me"
                onClick={GetRandomMeal}
              >
                Suggest Me
              </button>
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
                  <button
                    className="bg-orange-500 text-white border w-full py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mt-6 hover:bg-orange-600"
                    aria-label="Suggest Me"
                    onClick={() => {
                      navigate(`/recipe/${selectedRecipe.idMeal}`);
                    }}
                  >
                    View full details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
