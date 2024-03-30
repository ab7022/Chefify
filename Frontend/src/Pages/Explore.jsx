import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpointsCategory, apiEndpointsSearch } from "../components/APIEndpoint";
import RecipeCardSecondary from "../components/RecipeCardSecondary";

export default function Explore() {
 const  navigate = useNavigate();
  const [apiDataCategory, setApiDataCategory] = useState([]);
  const [apiDataSearch, setApiDataSearch] = useState([]);
  const [apiSearch, setApiSearch] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page for pagination
  useEffect(() => {
    fetchRandomCategoryData();
    fetchRandomSearchData();
  }, []); 

  const fetchRandomCategoryData = async () => {
    setLoading(true);
    try {
      const randomEndpoint = getRandomEndpoint(apiEndpointsCategory);
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/${randomEndpoint}`);
      setApiDataCategory((prevData) => [...prevData, ...(response.data.meals || [])]);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchRandomSearchData = async () => {
    setLoading(true);
    try {
      const randomKey = getRandomKey(apiEndpointsSearch);
      const randomEndpoint = apiEndpointsSearch[randomKey];
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/${randomEndpoint}`);
      setApiDataSearch((prevData) => [...prevData, ...(response.data.meals || [])]);
    } catch (error) {
      console.error("Error fetching search data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomEndpoint = (endpoints) => {
    const keys = Object.keys(endpoints);
    return endpoints[keys[Math.floor(Math.random() * keys.length)]];
  };

  const getRandomKey = (endpoints) => {
    const keys = Object.keys(endpoints);
    return keys[Math.floor(Math.random() * keys.length)];
  };

  const loadMore = () => {
    setPage(page + 1); // Increment page
    fetchRandomSearchData(); // Fetch more data
    fetchRandomCategoryData()
  };
  const handleSearch = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      setApiSearch(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching search data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="glassmorphism-bg min-h-screen max-w-full flex flex-col justify-center align-middle items-center">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6 md:mt-24">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Explore New Recipes
        </h1>

        <div className="flex items-center my-6  ">
          <input
            type="text"
            placeholder="Search for recipes"
            className="flex-1 border p-3 rounded-md focus:outline-none" onChange={(e) =>setSearch(e.target.value) }
          />
          <button
            className="ml-2 p-3 px-5 bg-orange-500 rounded hover:bg-orange-600 text-white"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

     
      </div>

      <section className="mt-8 glassmorphism-secondary p-3 bg-gray-50 w-7xl flex flex-col">
      <div className="flex flex-col gap-2 mb-1">
          {/* Displaying category recipes */}
          {apiSearch.map((recipe, index) => (
            <Link to={`/recipe/${recipe.idMeal}`} key={index}>
              <RecipeCardSecondary
                image={recipe.strMealThumb}
                name={recipe.strMeal}
                category={recipe.strCategory}
                area={recipe.strArea}
              />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 mb-1">
          {/* Displaying category recipes */}
          {apiDataCategory.map((recipe, index) => (
            <Link to={`/recipe/${recipe.idMeal}`} key={index}>
              <RecipeCardSecondary
                image={recipe.strMealThumb}
                name={recipe.strMeal}
                category={recipe.strCategory}
                area={recipe.strArea}
              />
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 mb-1">
          {/* Displaying search recipes */}
          {apiDataSearch.map((recipe, index) => (
            <Link to={`/recipe/${recipe.idMeal}`} key={index}>
              <RecipeCardSecondary
                image={recipe.strMealThumb}
                name={recipe.strMeal}
                category={recipe.strCategory}
                area={recipe.strArea}
              />
            </Link>
          ))}
        </div>

        {/* Button to load more recipes */}
        <button
          className="bg-orange-500 text-white border w-full py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mb-20 mt-4 hover:bg-orange-600"
          aria-label="Load More"
          onClick={loadMore}
        >
          Show More
        </button>
      </section>

      <Footer />
    </div>
  );
          }
        