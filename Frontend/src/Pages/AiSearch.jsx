import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Typewriter from "typewriter-effect";

export default function AiSearch() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <div className="bg-gradient-to-br from-transparent to-slate-200 bg-center h-screen flex flex-col justify-center items-center">
        <div className="text-orange-500 text-3xl font-bold mb-8 md:5xl">
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
                .start();
            }}
          />
        </div>
        <p className="text-black text-center mb-8">
          Find perfect recipes effortlessly!
        </p>
        <input
          type="text"
          placeholder="Search for recipes"
          className="border-2 border-orange-500 rounded-md px-4 py-2 mb-4 focus:outline-none"
        />
        <button className="bg-white text-orange-500 px-6 py-3 rounded-md hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out">
          Search
        </button>
      </div>
      
      <Footer />
    </div>
  );
}
