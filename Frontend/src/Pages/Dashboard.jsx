import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import breakfast from "../assets/3924822_12690.png";
import burger from "../assets/78178774_Fresh beef burger isolated -4.png";
import biryani from "../assets/biryani.png";
import momos from "../assets/momos.png";
import roll from "../assets/roll.png";
import tea from "../assets/tea.png";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate()
  const [response, setResponse] = useState({ categories: [] });

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
  
  const [selectedCategory, setSelectedCategory] = useState();
  const [recipes, setRecipes] = useState([]);

  const handleCategoryClick = async (categoryName) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
      const data = await response.json();
      setRecipes(data.meals || []);
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  return (
    <div className="glassmorphism-bg">
      <div className="pt-6 md:pt-52 p-3 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="max-w-2xl mx-auto">
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

          <section className="mt-4 glassmorphism-bg p-4">
      <h2 className="text-lg font-bold mb-4">What are you looking for?</h2>
      <div className="flex flex-row text-sm overflow-x-auto">
        {[...response.categories]
          .filter(category => category.strCategory !== 'Pork' && category.strCategory !== 'Miscellaneous')
          .map((category, index) => (
            <div key={index} className="mr-4 min-w-16 min-h-16 flex items-center">
              <div className="flex flex-col">
                <div
                  className={`rounded-full shadow-lg bg-slate-50 p-1 cursor-pointer ${
                    selectedCategory === category.strCategory ? 'border-2 border-blue-500' : ''
                  }`}
                  onClick={() =>{
                    navigate("/categories")
                     handleCategoryClick(category.strCategory
                      )}
                     }
                >
                  <img
                    src={category.strCategoryThumb}
                    alt=""
                    className="rounded-full min-w-14 min-h-14 object-cover"
                  />
                </div>
                <p className="text-center p-1.5">{category.strCategory}</p>
              </div>
            </div>
          ))}
      </div>

      {recipes.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mt-4">Recipes for {selectedCategory}:</h3>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>{recipe.strMeal}</li>
            ))}
          </ul>
        </div>
      )}
    </section>

          <section className="mt-8 glassmorphism-secondary p-4 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Top Breakfast Recipes</h2>
            <div className="flex flex-row flex-nowrap overflow-x-auto gap-4 mb-2">
              <RecipeCard
                image={biryani}
                name="Chicken Biryani"
                time="13 mins"
              />
              <RecipeCard image={momos} name="Chicken Momo" time="13 mins" />
              <RecipeCard image={roll} name="Chicken Roll" time="13 mins" />
            </div>
          </section>

          <section className="mt-8 glassmorphism-secondary p-4  bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Recent Recipes</h2>
            <div className="flex flex-row flex-nowrap overflow-x-auto gap-4 mb-2">
              <RecipeCard image={burger} name="Veg Burger" time="13 mins" />
              <RecipeCard image={roll} name="Chicken Roll" time="13 mins" />
              <RecipeCard image={momos} name="Chicken Momo" time="13 mins" />
            </div>
          </section>
          <div className="glassmorphism-secondary flex flex-col justify-center p-4  mt-8 mb-24">
            <p className="text-xl p-2 font-semibold">
              Not sure what you want to cook? Get personalized suggestions!
            </p>
            <button
              className="bg-orange-500 text-white border w-full py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mb-4 hover:bg-orange-600"
              aria-label="Suggest Me"
            >
              Suggest Me
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
