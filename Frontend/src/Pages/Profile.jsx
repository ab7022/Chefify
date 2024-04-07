// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [likes, setLikes] = useState([]);
  console.log(userData);
  function setLogout() {
    localStorage.clear();
  }

  console.log(userData.likes);
  // Placeholder data for likes, favorites, and user recipes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://foodie-five-pi.vercel.app/profile", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        setUserData(response.data);
        setLikes(response.data.likes);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/signin");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />

      <div className="container mx-auto p-6 md:mt-28 md:max-w-4xl flex flex-col justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex items-center justify-between">
          <div className="bg-gray-500 p-4 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full">
            <BsPerson />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-orange-400">
              {userData.name}
            </h1>
            <p className="text-gray-600 text-center text-sm">
              {userData.username}
            </p>
          </div>
          <BsPerson className="text-3xl  text-gray-600" />
        </div>

        <div className="bg-white p-4 rounded shadow-md mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-orange-400 flex items-center">
              <AiOutlineHeart className="mr-2" />
              Your Likes
            </h2>
          </div>
          <ul className="list-disc pl-6">
            {likes.map((like, index) => (
              <li key={index} className="text-gray-700 mb-2">
                <a href={`/#/recipe/${like.recipeId}`}>{like.recipeName}</a>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="bg-slate-50 text-gray-700 border-2 border-yellow-500 border w-full py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mb-4 hover:bg-orange-500 hover:text-white"
          aria-label="Logout"
          onClick={setLogout}
        >
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
