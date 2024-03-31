import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Typewriter from "typewriter-effect";
import { useEffect,useState } from "react";

export default function AiSearch() {
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Chicken Biryani",
    "Shahi Paneer",
    "Cheese Cake",
    "Pumpkin Pie",
  ];

  useEffect(() => {
    // Update the placeholder text every two seconds
    const interval = setInterval(() => {
      setPlaceholderText(placeholders[placeholderIndex]);
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholderIndex]);
  return (
    <div className="min-h-screen font-sans ">
      <Navbar />
      
      <div className="bg-gradient-to-br from-purple-50 to-slate-300 bg-center h-screen flex flex-col justify-center items-center">
        <div className="text-yellow-500 text-3xl font-bold mb-8 md:text-7xl">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Welcome to AI Search")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Find Recipes Easily")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Discover New Delights")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Start Exploring Now!")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Welcome to AI Search")
.start();     }}
          />
        </div>
        <p className="text-yellow-700 text-center mb-8">
          Find perfect recipes effortlessly!
        </p>
        <input
          type="text"
          placeholder={placeholderText}
          className="border-2 border-orange-500 rounded-md px-4 py-2 mb-4 focus:outline-none flex w-9/12"
        />
        <button className="bg-white text-orange-500 px-6 py-3 rounded-md hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out">
          Search
        </button>
      </div>
      
      <Footer />
    </div>
  );
}
