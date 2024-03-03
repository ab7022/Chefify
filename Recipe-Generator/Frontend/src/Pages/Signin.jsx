import React from "react";

const Signin = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200">
      <div className="m-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-orange-500 mb-2">
              Foodiee
            </h1>
            <p className="text-gray-500">
              Discover and Share Mouthwatering Recipes
            </p>
          </div>

          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-md border-gray-300 focus:border focus:bg-gray-50 shadow-sm bg-gray-100"
          />
          <input
            type="text"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-md border-gray-300 focus:border focus:bg-gray-50 shadow-sm my-4 bg-gray-100"
          />
          <button className="bg-orange-500 font-bold text-white p-3 rounded-xl w-full hover:bg-orange-600 transition duration-300 text-lg">
            Sign In
          </button>

          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-500 text-sm mx-4 md:mx-36">
              Don't have an account?{" "}
              <a
                href="#/signup"
                className=" font-bold underline text-orange-500"
              >
                Create one here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
