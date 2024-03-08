import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AddRecipe() {
  return (
    <div className="min-h-screen font-sans  abcd">
      <Navbar />

      <div className="container mx-auto p-6 md:mt-16 md:max-w-4xl flex flex-col justify-center  ">
        <h1 className="text-3xl font-semibold mb-6 text-center md:mt-12">Add Recipe</h1>
        <form className="bg-white bg-opacity-90 shadow-md rounded-lg px-8 py-6 mb-20 ">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter the recipe name"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="ingredients"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              placeholder="Enter the ingredients (one per line)"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-purple-500"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="directions"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Directions
            </label>
            <textarea
              id="directions"
              placeholder="Enter the cooking directions (one per line)"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-purple-500"
              rows="6"
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="categories"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Categories
            </label>
            <select
              id="categories"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-purple-500"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="cookingTime"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Cooking Time (in minutes)
            </label>
            <input
              type="number"
              id="cookingTime"
              placeholder="Enter the cooking time"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a brief description of the recipe"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-purple-500"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-2 py-4 rounded-md hover:bg-orange-600 focus:outline-none mx-24 mb-4"
          >
            Submit Recipe
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
