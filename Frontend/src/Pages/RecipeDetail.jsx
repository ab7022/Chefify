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
          <div
            key={i}
            className="flex  items-center w-full mb-2 bg-purple-50 p-1 rounded shadow border-white border"
          >
            <div className="bg-gray-100 mr-3">
              <img
                src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                alt={ingredient}
                className="w-16 h-16 mr-2 rounded-full "
              />
            </div>

            <div>
              <span className="font-bold text-lg ">{ingredient}</span>
              <span className="text-gray-500 ml-2">({measure})</span>
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
      <div className="relative">
        <img
          src={recipeDetail.strMealThumb}
          alt={recipeDetail.strMeal}
          className="w-full mb-6  shadow-md max-w-2xl max-h-72"
        />
        <div className="absolute bottom-0 left-0 w-full h-20 gradient-overlay">
          <h1 className="text-3xl font-semibold text-white p-4">
            {recipeDetail.strMeal}
          </h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-0 md:mt-24">
        <div className="bg-white p-4 rounded-t-2xl shadow-md mt-1">
          <table className="w-full mb-4 bg-red-100  rounded-bl-3xl rounded-tr-3xl">
            <tbody>
              <tr className="flex flex-row justify-around p-2">
                <div className=" flex flex-col w-1/2 justify-center">
                  <td className="font-semibold">Name:</td>
                  <td className="pr-2">
                    {recipeDetail.strMeal || "Not available"}
                  </td>
                </div>

                <div className="flex flex-col w-1/2 justify-center   ">
                  <td className="font-semibold">Category:</td>
                  <td className="pr-2">
                    {recipeDetail.strCategory || "Not available"}
                  </td>
                </div>
              </tr>
              <tr className="flex flex-row justify-around p-2">
                <div className="flex flex-col w-1/2 justify-center">
                  <td className="font-semibold">Area:</td>
                  <td className="pr-2">
                    {recipeDetail.strArea || "Not available"}
                  </td>
                </div>

                <div className="flex flex-col w-1/2 justify-center">
                  <td className="font-semibold">Tags:</td>
                  <td className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {" "}
                    {recipeDetail.strTags || "Not available"}
                  </td>
                </div>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 glassmorphism-bg2">
              <h2 className="text-2xl font-semibold text-orange-500 px-4 pt-4">
              Description:
              </h2>
              <p className="p-4 text-justify">
              {recipeDetail.strInstructions || "Not available"}
            </p>            </div>
          <div className="text-gray-700 mb-20">
            <div className="mt-6 glassmorphism-bg2">
              <h2 className="text-2xl font-semibold text-orange-500 p-4">
                Ingredients:
              </h2>
              <div className="flex flex-wrap p-2">{renderIngredients()}</div>
            </div>

           <div className="bg-red-500 p-4 rounded-xl mt-4">
              {recipeDetail.strYoutube && (
                <a
                  href={recipeDetail.strYoutube}
                  target="_blank"
                  className="text-white font-bold text-xl flex justify-center "
                >
                  Watch Youtube Video
                </a>
              
              ) }
           </div>
               
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
