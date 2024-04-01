import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { TextDecoder } from 'text-encoding';

export default function AiSearch() {
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [responseChunks, setResponseChunks] = useState([]); // Store chunks in an array
  const [response, setResponse] = useState("");
  const placeholders = [
    "Enter Dish name",
    "Mutton Biryani",
    "Chicken Tikka Masala",
    "Find a New Favorite",
    "Explore Cuisines",
  ];
  useEffect(() => {
    // Concatenate all chunks into a single string
    const concatenatedResponse = responseChunks.join('');
    setResponse(concatenatedResponse);
  }, [responseChunks]);

  const updatedPrompt = "show me a recipe step by step with all ingredients which is" + prompt;
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/Aisearch", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt:updatedPrompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();

      let chunks = [];
      let result = await reader.read();
      while (!result.done) {
        chunks.push(result.value);
        result = await reader.read();
      }

      // Concatenate the chunks into a single Uint8Array
      const concatenatedChunks = chunks.reduce(
        (accumulator, chunk) => {
          const tempArray = new Uint8Array(accumulator.length + chunk.length);
          tempArray.set(accumulator, 0);
          tempArray.set(chunk, accumulator.length);
          return tempArray;
        },
        new Uint8Array(0)
      );

      // Decode the concatenated chunks into a string
      const decodedResponse = new TextDecoder().decode(concatenatedChunks);

      // Split the decoded response into chunks
      const chunkSize = 100;
      const decodedResponseChunks = [];
      for (let i = 0; i < decodedResponse.length; i += chunkSize) {
        decodedResponseChunks.push(decodedResponse.slice(i, i + chunkSize));
      }

      setResponseChunks(decodedResponseChunks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    setResponseChunks([]); // Clear previous response chunks
    fetchData();
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
        <div className="my-20 px-8">
  {responseChunks.map((chunk, index) => (
    <div key={index}>{chunk}</div>
  ))}
</div>
      <div>{response}</div>
      </div>
      <Footer />
      {/* Render response chunks */}

    </div>
  );
}
