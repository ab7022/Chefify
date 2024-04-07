import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header className="justify-between items-center md:p-8 md:px-24 fixed top-0 bg-gray-100 w-full shadow-lg hidden md:flex z-50">
      <div className="logo text-5xl font-bold font-sans">CHEFIFY</div>
      <nav className="flex flex-row space-x-6 font-medium text-xl">
        <a href="#/home" className="nav-link hover:underline">
          Home
        </a>
        <a
          href="#/explore"
          className="nav-link hover:underline hover:text-orange-500"
        >
          Explore Recipes
        </a>
        <a
          href="#/AiSearch"
          className="nav-link hover:underline hover:text-orange-500"
        >
          AI Search
        </a>
        <a
          href="#/profile"
          className="nav-link hover:underline hover:text-orange-500"
        >
          My Profile
        </a>
      </nav>
      <div>
        {isLoggedIn ? (
          <button
            className="nav-link bg-orange-500 hover:bg-orange-600 py-3 px-7 text-white rounded-md font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <a
            href="#/signin"
            className="nav-link bg-orange-500 hover:bg-orange-600 py-3 px-7 text-white rounded-md font-semibold"
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
}
