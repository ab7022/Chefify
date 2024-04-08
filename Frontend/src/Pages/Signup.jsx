import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const signup = async () => {
    try {
      const response = await axios.post("https://foodie-five-pi.vercel.app/signup", {
        name,
        username,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", response.data.token);
      setResponseMessage(response.data.msg);
      if (response.data.msg === "Account created successfully") {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
<div className="flex items-center justify-center h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200">
<Navbar/>

      <div className="m-6">
        <div className="bg-white p-8 rounded-lg shadow-lg md:mt-20">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-orange-500 mb-2">
              Foodiee
            </h1>
            <p className="text-gray-500">Explore and Share Delicious Recipes</p>
          </div>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full p-3 rounded-md border-gray-300 focus:border focus:bg-gray-50 shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600">
                Email Address
              </label>
              <input
                type="mail"
                id="email"
                name="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="john@example.com"
                className="w-full p-3 rounded-md border-gray-300 focus:border focus:bg-gray-50 shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600">
                Password
              </label>
              <input
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                placeholder="Create a strong password"
                className="w-full p-3 rounded-md border-gray-300 focus:border focus:bg-gray-50 shadow-sm bg-gray-100"
              />
            </div>
            {responseMessage && (
              <div className="my-1 text-red-500 text-sm">
                {responseMessage}
              </div>
            )}

            <button
              className="bg-orange-500 text-lg font-bold text-white p-3 rounded-xl w-full hover:bg-orange-600 transition duration-300"
              type="button"
              onClick={signup}
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 flex flex-row">
            <p className="text-gray-500 text-sm">
              Already a member?{" "}
              <a href="#/signin" className="text-sm text-black font-bold underline">
                Log in here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};


export default Signup;
