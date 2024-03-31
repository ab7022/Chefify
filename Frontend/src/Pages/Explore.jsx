import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpointsCategory, apiEndpointsSearch } from "../components/APIEndpoint";
import RecipeCardSecondary from "../components/RecipeCardSecondary";
import SkeletonCard from "../components/Skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Explore() {
  const navigate = useNavigate();
  const [apiDataCategory, setApiDataCategory] = useState([]);
  const [apiDataSearch, setApiDataSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page for pagination

  useEffect(() => {
    fetchRandomData();
  }, [page]); // Refetch data when page changes

  const fetchRandomData = async () => {
    setLoading(true);
    try {
      // Fetch data for both category and search
      const randomCategoryEndpoint = getRandomEndpoint(apiEndpointsCategory);
      const randomSearchEndpoint = getRandomEndpoint(apiEndpointsSearch);

      const categoryResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/${randomCategoryEndpoint}`);
      const searchResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/${randomSearchEndpoint}`);

      // Update state with fetched data
      setApiDataCategory((prevData) => [...prevData, ...(categoryResponse.data.meals || [])]);
      setApiDataSearch((prevData) => [...prevData, ...(searchResponse.data.meals || [])]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomEndpoint = (endpoints) => {
    const keys = Object.keys(endpoints);
    return endpoints[keys[Math.floor(Math.random() * keys.length)]];
  };

  const loadMore = () => {
    setPage(page + 1); // Increment page
  };

  const handleSearch = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      setApiDataSearch(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching search data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glassmorphism-bg min-h-screen max-w-full flex flex-col justify-center align-middle items-center">
      {loading ? (
        <div className="w-full">
                  <SkeletonCard />

           </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full p-6 md:mt-24 mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
              Explore New Recipes
            </h1>
            <div className="flex items-center my-6 max-w-3xl md:w-6xl mx-auto">
              <input
                type="text"
                placeholder="Search for recipes"
                className="flex border p-3 rounded-md focus:outline-none w-full"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="ml-2 p-3 px-5 bg-orange-500 rounded hover:bg-orange-600 text-white"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <section className="mt-8 glassmorphism-secondary p-3 bg-gray-50 w-3xl flex flex-col">
            <div className="flex flex-wrap gap-5 mb-1 max-w-4xl justify-center items-center">
              {apiDataSearch.map((recipe, index) => (
                <Link to={`/recipe/${recipe.idMeal}`} key={index} className="w-full md:w-5/12 flex-wrap">
                  <RecipeCardSecondary
                    image={recipe.strMealThumb}
                    name={recipe.strMeal}
                    category={recipe.strCategory}
                    area={recipe.strArea}
                  />
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-5 mb-1 max-w-4xl justify-center items-center">
              {apiDataCategory.map((recipe, index) => (
                <Link to={`/recipe/${recipe.idMeal}`} key={index} className="w-full md:w-5/12 flex-wrap">
                  <RecipeCardSecondary
                    image={recipe.strMealThumb}
                    name={recipe.strMeal}
                    category={recipe.strCategory}
                    area={recipe.strArea}
                  />
                </Link>
              ))}
            </div>
            <button
              className="bg-orange-500 text-white border w-full py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mb-20 mt-4 hover:bg-orange-600"
              aria-label="Load More"
              onClick={loadMore}
            >
              Show More
            </button>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}
