import React from "react";

const Signup = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200">
      <div className="m-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
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
                placeholder="John Doe"
                className="w-full p-3 rounded-md border-gray-300 focus:border focus:bg-gray-50 shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                placeholder="john@example.com"
                className="w-full p-3 rounded-md border-gray-300 focus:border focus:bg-gray-50 shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a strong password"
                className="w-full p-3 rounded-md border-gray-300 focus:border focus:bg-gray-50 shadow-sm bg-gray-100"
              />
            </div>

            <button className="bg-orange-500 text-lg font-bold text-white p-3 rounded-xl w-full hover:bg-orange-600 transition duration-300">
              Sign Up
            </button>
          </form>

          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-500 text-sm mx-12 md:mx-16">
              Already a member?{" "}
              <a href="#/signin" className="text-black font-bold underline">
                Log in here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
