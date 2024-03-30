import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const RecipeDetail = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [isLoved, setIsLoved] = useState(false); // State to manage loved status
  const handleLove = () => {
    setIsLoved(!isLoved); // Toggle love status
    // Further logic for loving the recipe
  };

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        setRecipeDetail(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching recipe detail:", error);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  const renderInstructions = () => {
    if (!recipeDetail || !recipeDetail.strInstructions) {
      return <p className="p-4 text-justify text-xs">Instructions not available</p>;
    }

    const instructionsArray = recipeDetail.strInstructions.split(/\bSTEP\b/).filter(Boolean);
    return (
      <>
        {instructionsArray.map((instruction, index) => {
          const parts = instruction.trim().split('\n').filter(Boolean);
          const stepNumber = parts.shift();
          return (
            <div key={index} className="p-4 text-justify text-xs">
              <strong>{stepNumber}</strong>
              {parts.map((part, idx) => (
                <p key={idx}>{part}</p>
              ))}
            </div>
          );
        })}
      </>
    );
  };

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipeDetail && recipeDetail[`strIngredient${i}`];
      const measure = recipeDetail && recipeDetail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(
          <div
            key={i}
            className="flex items-center w-full mb-2 bg-purple-50 p-1 rounded shadow border-white border"
          >
            <div className="bg-gray-100 mr-3">
              <img
                src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                alt={ingredient}
                className="w-14 h-14 rounded-full"
              />
            </div>
            <div>
              <span className="font-bold text-base">{ingredient}</span> <br />
              <span className="text-gray-500 text-xs">({measure})</span>
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
      {recipeDetail ? (
        <div className="relative flex items-center justify-center  align-middle md:mt-28">
         
          <img
            src={recipeDetail.strMealThumb}
            alt={recipeDetail.strMeal}
            className="w-full mb-6 shadow-md max-w-2xl max-h-96 md:top-10 object-cover rounded-md"
          />
          <div className="absolute rounded md:bottom-6 md:left-56 md:ml-2 md:max-w-2xl h-20 gradient-overlay justify-center align-middle items-center -mt-4">
            <h1 className="text-3xl font-semibold text-white p-4 text-center">
              {recipeDetail.strMeal}
            </h1>
          </div>
        </div>
      ) : (
        <div className="glassmorphism-bg min-h-screen flex items-center justify-center">
          Loading...
        </div>
      )}
      {recipeDetail && (
        <div className="max-w-2xl mx-auto p-0 md:mt-24">
          <div className="bg-white p-4 rounded-t-2xl shadow-md mt-1">
          <FontAwesomeIcon
        icon={faHeart}
        onClick={handleLove}
        className={isLoved ? "text-red-500 cursor-pointer" : "static text-gray-500 cursor-pointer"}
        size="2x"
      />
            <table className="w-full mb-4 bg-red-100  rounded-bl-3xl rounded-tr-3xl">
              <tbody>
                <tr className="flex flex-row justify-around p-2">
                  <div className=" flex flex-col w-1/2 justify-center px-2">
                    <td className="font-semibold">Name:</td>
                    <td className="pr-2">
                      {recipeDetail.strMeal || "Not available"}
                    </td>
                  </div>

                  <div className="flex flex-col w-1/2 justify-center px-2  ">
                    <td className="font-semibold">Category:</td>
                    <td className="pr-2">
                      {recipeDetail.strCategory || "Not available"}
                    </td>
                  </div>
                </tr>
                <tr className="flex flex-row justify-around p-2">
                  <div className="flex flex-col w-1/2 justify-center px-2">
                    <td className="font-semibold">Area:</td>
                    <td className="pr-2">
                      {recipeDetail.strArea || "Not available"}
                    </td>
                  </div>

                  <div className="flex flex-col w-1/2 justify-center px-2">
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
              {renderInstructions()}
            </div>
            <div className="text-gray-700 mb-20">
              <div className="mt-6 glassmorphism-bg-secondary">
                <h2 className="text-2xl font-semibold text-orange-500 p-4">
                  Ingredients:
                </h2>
                <div className="flex flex-wrap p-2">{renderIngredients()}</div>
              </div>
              {recipeDetail.strYoutube && (
                <div className="bg-red-500 p-2 rounded-lg my-10">
                  <a
                    href={recipeDetail.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold text-base flex justify-center"
                  >
                    Watch Youtube Video
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RecipeDetail;
