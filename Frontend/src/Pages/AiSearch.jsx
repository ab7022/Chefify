import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { TextDecoder } from 'text-encoding';
import ReactMarkdown from 'react-markdown';

export default function AiSearch() {
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [responseChunks, setResponseChunks] = useState([]);
  const [response, setResponse] = useState("");
  const placeholders = [
    "Enter Dish name",
    "Mutton Biryani",
    "Chicken Tikka Masala",
    "Find a New Favorite",
    "Explore Cuisines",
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) =>
        prevIndex === placeholders.length - 1? 0 : prevIndex + 1
      );
    }, 3000); // Change placeholder every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlaceholderText(placeholders[placeholderIndex]);
  }, [placeholderIndex]);

  const handleSearch = (e) => {
    e.preventDefault();
    setResponseChunks([]);
    fetchData();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Pop the first chunk from the responseChunks array
      const chunk = responseChunks.shift();
      if (chunk) {
        // Update the response state with the new chunk
        setResponse((prevResponse) => prevResponse + chunk);
      }
    }, 1000); // Adjust the interval as needed
    
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [responseChunks]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/Aisearch", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();

      let chunks = [];
      let result = await reader.read();
      while (!result.done) {
        chunks.push(new TextDecoder().decode(result.value));
        setResponseChunks(chunks); // Update UI with each chunk received
        result = await reader.read();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-t from-white to-orange-100">
      <Navbar />
      <div className="h-screen flex flex-col justify-start md:justify-center items-center">
        <div className="text-gray-800 text-5xl font-bold md:text-6xl p-6 text-center mt-24 md:mt-0">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Find Recipes with AI")
                .start()
                .pauseFor(1000)
                .deleteAll()
                .typeString("Search your favorite dish with AI")
                .pauseFor(2500)
                .stop()
                .start();
            }}
          />
        </div>
        <div className="mt-0 md:mt-4 text-justify text-sm md:text-lg  text-gray-700">
          <p className="px-8">
            Discover new cooking techniques and ingredients. Get personalized
            recommendations just for you.
          </p>
        </div>
        <div className="mt-8 flex flex-col md:flex-col items-center w-10/12 md:w-7/12 gap-3">
          <input
            type="text"
            name="prompt"
            placeholder={placeholderText}
            className="border-2 border-orange-500 rounded-md px-4 py-2 focus:outline-none w-full"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="bg-transparent border-2 border-orange-500 text-gray-700 px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out hover:text-white" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="my-8 px-8">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}
