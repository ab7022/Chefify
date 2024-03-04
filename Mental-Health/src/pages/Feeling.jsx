// pages/Feeling.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Button from "../components/Button";

function Feeling() {
  const navigate = useNavigate();

  return (
    <div>
        <div className="bg-yellow-50 h-screen">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-xl mx-4 mt-6 text-gray-800">
          How are you feeling today
        </h1>
        <a href="#" className="text-yellow-700 text-lg">
          Save
        </a>
      </div>
      <div className="flex flex-wrap mt-6">
        <div className="text-sm flex gap-2">
          <button className="flex-1 px-4 py-2 bg-gray-200 rounded-xl">
            Happy
          </button>
          <button className="flex-1 px-4 py-2 bg-gray-200 rounded-xl">
            Excited
          </button>
          <button className="flex-1 px-4 py-2 bg-gray-200 rounded-xl">
            Content
          </button>
          <button className="flex-1 px-4 py-2 bg-gray-200 rounded-xl">
            Calm
          </button>
          <button className="flex-1 px-4 py-2 bg-gray-200 rounded-xl">
            Sad
          </button>
        </div>
      </div>
      <label
        htmlFor="feelingSlider"
        className="block text-xl font-bold text-gray-800 mt-8"
      >
        How Strong is Your Feeling?
      </label>
      <input
        type="range"
        id="feelingSlider"
        name="feelingSlider"
        min="0"
        max="100"
        className="w-full h-4 mt-2 rounded-md overflow-hidden appearance-none bg-orange-100"
      />
      <h1 className="text-2xl font-semibold mt-6 text-gray-800">Note</h1>
      <textarea
        className="w-full h-32 mt-2 p-2 bg-white rounded-md focus:outline-none"
        placeholder="Add your note here..."
      ></textarea>
      <div className="mt-4  w-full">
        <div className="mx-4">
          <Button
            onClick={() => {
              console.log("Submit clicked");
              navigate("/feeling");
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Feeling;
