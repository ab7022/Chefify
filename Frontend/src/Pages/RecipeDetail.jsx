import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { div } from "prelude-ls";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [isLoved, setIsLoved] = useState(false); // State to manage loved status
  const handleLove = () => {
    setIsLoved(!isLoved); 
  };
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [liked,setLiked] = useState(false)
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
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
      return (
        <p className="p-4 text-justify text-base">Instructions not available</p>
      );
    }

    const instructionsArray = recipeDetail.strInstructions
      .split(/\bSTEP\b/)
      .filter(Boolean);
    return (
      <>
        {instructionsArray.map((instruction, index) => {
          const parts = instruction.trim().split("\n").filter(Boolean);
          const stepNumber = parts.shift();
          return (
            <div key={index} className="p-4 text-justify text-base">
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

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleTextChange = (event) => {
    setNewReview({ ...newReview, text: event.target.value });
  };

  const handleSubmitReview = () => {
    // You would typically send the new review to the backend here
    setReviews([...reviews, newReview]);
    setNewReview({ rating: 0, text: "" });
  };
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  const StarIcon = ({ filled }) => {
    return (
      <FontAwesomeIcon
        icon={filled ? solidStar : regularStar}
        className="text-yellow-500"
      />
    );
  };
  const handleLike = async () => {
    try {
      handleLove();
      if (!token) {
        toast.error("Please Login First");
        return;
      }
      const response = await axios.post('https://foodie-five-pi.vercel.app/like', 
        {  recipeId: recipeDetail.idMeal,recipeName:recipeDetail.strMeal },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 

          }
        }
      );
      if (response.status === 200) {
        setLiked(true);
      }
    } catch (error) {
      toast.error("An error occurred while liking the recipe");

      console.error('Error liking recipe:', error);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Toaster/>
      {recipeDetail ? (
        <div className="relative flex items-center justify-center  align-middle md:mt-28 md:pt-4">
          <img
            src={recipeDetail.strMealThumb}
            alt={recipeDetail.strMeal}
            className="w-full mb-6 shadow-md max-w-3xl max-h-96 md:top-10 object-cover rounded-md"
          />
          <div className="absolute rounded md:bottom-6 md:left-auto md:max-w-3xl h-20 gradient-overlay justify-center align-middle items-center -mt-4">
            <h1 className="text-2xl font-semibold text-white p-4 text-center">
              {recipeDetail.strMeal}
            </h1>
          </div>
        </div>
      ) : (
        <div className=" min-h-screen flex items-center justify-center">
          Loading...
        </div>
      )}
      {recipeDetail && (
        <div className="max-w-3xl mx-auto p-0 md:mt-8 mb-8">
          <div className="glassmorphism-bg p-4 text-xl mt-4 m-2 flex justify-between ">
            <div>
              {reviews.length === 0 ? (
                <p className="mt-2">No reviews yet.</p>
              ) : (
                <div className="flex flex-col">
                  <p className="text-lg mr-2">Average Rating:</p>
                  <div className="flex flex-row">
                    {[...Array(Math.round(calculateAverageRating()))].map(
                      (_, index) => (
                        <StarIcon key={index} filled={true} />
                      )
                    )}
                    {[...Array(5 - Math.round(calculateAverageRating()))].map(
                      (_, index) => (
                        <StarIcon key={index + 5} filled={false} />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
            {recipeDetail.strYoutube && (
              <div className="bg-red-500 p-3 rounded-lg hover:bg-red-600">
                <a
                  href={recipeDetail.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold text-base flex justify-center"
                >
                  Watch Video
                </a>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-t-2xl shadow-md mt-1 ">
            <div className="flex flex-row justify-end">
              <FontAwesomeIcon
                icon={faHeart}
                onClick={
                  handleLike
                }
                className={`flex flex-row justify-end relative top-7 mr-4 ${
                  isLoved
                    ? "text-red-500 cursor-pointer"
                    : "text-gray-500 cursor-pointer "
                }`}
                size="3x"
              />
            </div>

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
            </div>
            <div className="glassmorphism-bg-secondary p-4 rounded-md">
  <h2 className="text-2xl font-semibold text-orange-500 mb-4">Add a Review</h2>
  <div className="mb-4">
    <label className="block text-lg mb-2">Rating:</label>
    <select
      value={newReview.rating}
      onChange={(e) => handleRatingChange(parseInt(e.target.value))}
      className="border rounded-md p-2 w-full"
    >
      <option value={0}>Select Rating</option>
      <option value={1}>1 Star</option>
      <option value={2}>2 Stars</option>
      <option value={3}>3 Stars</option>
      <option value={4}>4 Stars</option>
      <option value={5}>5 Stars</option>
    </select>
  </div>
  <div className="mb-4">
    <label className="block text-lg mb-2">Review:</label>
    <textarea
      value={newReview.text}
      onChange={handleTextChange}
      className="border rounded-md p-2 w-full h-24"
      placeholder="Write your review here..."
    />
  </div>
  <div className="flex items-center justify-center align-center">
     <button
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
    onClick={handleSubmitReview}
  >
    Submit Review
  </button>
  </div>
 
</div>

          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RecipeDetail;
