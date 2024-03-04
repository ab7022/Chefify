// pages/About.js
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import meditate from "../assets/meditate_img.jpg";
import { useNavigate, Link } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);
  const images = [meditate, /* add more image paths as needed */];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change the duration of the slider

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center flex-col ">
        <img
          src={meditate}
          alt="Meditate"
          className="w-full h-full "
        />
      </div>

      <div className="flex-grow max-h-48"></div>

      <div className="text-center flex flex-col justify-end mt-0">
        <h1 className="text-3xl font-bold my-8 ">Welcome To Calm</h1>
        <p className="text-lg text-justify mb-4 px-2">
          Where peace and tranquility are just a few taps away. Our mission is to
          make the world happier and healthier. We're so glad you're here.
        </p>
        <div className="">
          <Button onClick={() => {console.log("Get Started clicked")
            navigate("/feeling");
        }}>
            Get Started
          </Button>
          <div className="text-orange-900 font-semibold mt-2">
                      <Link to={"/"}>Already have an account? Login</Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
// pages/LandingPage.js


