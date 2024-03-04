// pages/LandingPage.js
import React from "react";
import Button from "../components/Button";
import meditate from "../assets/meditate_img.jpg";
import { Link,useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen p-4 mt-0 items-center justify-center">
      <div className="flex items-center flex-col ">
        <img
          src={meditate}
          alt="Meditate"
          className="w-72 h-72 rounded-full shadow-2xl shadow-yellow-300"
        />
      </div>

      <div className="flex-grow max-h-80"></div>

      <div className="text-center flex flex-col justify-end mt-0">
        <h1 className="text-3xl font-bold mb-4">Welcome To Calm</h1>
        <p className="text-xl text-justify mb-4">
          Where peace and tranquility are just a few taps away. Our mission is to
          make the world happier and healthier. We're so glad you're here.
        </p>
        <div className="mt-2">
          <Button onClick={() => {console.log("Get Started clicked")
            navigate("/about");
        }}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
