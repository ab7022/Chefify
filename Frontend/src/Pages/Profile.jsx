import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';


const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [likes, setLikes] = useState([]);

  function setLogout() {
    localStorage.clear();
  }
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
        toast.error('Please login first');
        console.error("Error fetching user data:", error);
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
              {userData.name || "Loading..."}
            </h1>
            <p className="text-gray-600 text-center text-sm">
              {userData.username}
            </p>
          </div>
          <BsPerson className="text-3xl  text-gray-600" />
        </div>
        <Toaster/>
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-orange-400 flex items-center">
              <AiOutlineHeart className="mr-2" />
              Your Likes
            </h2>
          </div>
          <ul className="list-disc pl-6">
            {likes.map((like, index) => (
              <li key={index} className="text-gray-700 mb-2 underline pb-1">
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

      <div className="container mx-auto p-6  md:max-w-4xl flex flex-col flex-wrap ">
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex  flex-col">
          <h2 className="text-2xl font-bold text-orange-400 flex my-1 items-center p-2">
            <AiOutlineStar className="mr-2" />
            About Developer
          </h2>
        
        <p className="text-gray-700 mb-2  pb-1 px-2">
          Hello! I'm a passionate developer who loves building web applications.
          Feel free to connect with me on social media.
        </p>
        <div className="flex items-center mb-4 mx-2">
          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/abdul-bayees-2941b6202/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-600 w-10 h-10 mr-4" />
          </a>
          {/* GitHub Icon */}
          <a href="https://github.com/ab7022" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-800 w-10 h-10 mr-4" />
          </a>
          {/* Add more icons for other social media platforms if needed */}
          <a href="https://www.producthunt.com/posts/chefify?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-chefify" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=449774&theme=light" alt="Chefify - ai&#0032;recipe&#0044;&#0032;chefify&#0044;&#0032;best&#0032;recipes&#0044;&#0032;best&#0032;dishes&#0044;recipe&#0032;website | Product Hunt" /></a>
        </div>
        
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
