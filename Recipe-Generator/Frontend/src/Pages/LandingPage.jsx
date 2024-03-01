import React from "react";
import "../App.css";

const LandingPage = () => {
  return (
    <div className="flex bg-slate-50 flex-col md:flex-row relative">
      <div className="flex flex-col justify-center h-screen w-screen md:w-1/2">
        <header className="flex justify-between items-center md:p-8 md:px-24 fixed top-0 bg-gray-100 w-full shadow-lg hidden md:block md:flex">
          <div className="logo text-4xl font-bold">Foodiee</div>
          <nav className="flex flex-row space-x-6 font-medium">
            <a href="#" className="nav-link hover:underline">
              Home
            </a>
            <a
              href="#"
              className="nav-link hover:underline hover:text-orange-500"
            >
              Menu
            </a>
            <a
              href="#"
              className="nav-link hover:underline hover:text-orange-500"
            >
              Pricing
            </a>
            <a
              href="#"
              className="nav-link hover:underline hover:text-orange-500"
            >
              About Us
            </a>
          </nav>
          <div>
            <a
              href="#"
              className="nav-link bg-orange-500 hover:bg-orange-600 py-3 px-5 text-white rounded-md font-semibold"
            >
              Contact Us
            </a>
          </div>
        </header>

        <div className="flex flex-col justify-end mx-4 mt-24">
          <div className="text-black px-8">
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-style p-4 md:p-8 md:mt-8">
              Get the <span className="underline-orange">food</span> recipe more
              easily!
            </h1>
            <div className="px-8 md:mr-32 text-gray-600">
              <p className="font-medium md:text-lg hidden md:block">
                Find
                <span> </span>
                <span className="text-orange-500 font-semibold">
                  10,000+ good & delicious
                </span>
                <span> </span>
                recipes and start your amazing journey to healthy eating with
                us.
              </p>
            </div>

            <div className="flex flex-row justify-between m-8">
              <div className="block md:hidden flex flex-row w-full">
                <button
                  className="bg-orange-500 text-white border py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mr-4 hover:bg-orange-600"
                  aria-label="Login"
                >
                  Login
                </button>
                <button
                  className="text-lg bg-slate-50 text-orange-500 border py-2 px-6 md:px-8 rounded-lg font-extrabold border-transparent shadow hover:bg-gray-100"
                  aria-label="Register"
                >
                  Register
                </button>
              </div>
              <div className="hidden md:block">
                <button
                  className="bg-orange-500 text-white border py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mx-0 hover:bg-orange-600"
                  aria-label="Login"
                >
                  Explore now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full md:w-1/2 bg-image justify-center mt-48"></div>

      <div className="hidden md:block w-1/12 bg-image2"></div>
    </div>
  );
};

export default LandingPage;
