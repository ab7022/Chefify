import { useEffect } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Add overflow-hidden class to the body for small screens
    if (window.innerWidth > 768) {
      document.body.classList.add("overflow-hidden");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="flex bg-gradient-to-br from-yellow-100  via-blue-50 via-gray-50 via-indigo-50 to-red-50  md:slate-50 flex-col md:flex-row relative">
      {/* Background image for mobile (hidden on larger screens) */}
      <div className="w-full fixed inset-0 md:w-1/2 justify-center mt-0 md:mt-48 bg-image-md block md:hidden"></div>

      {/* Left half of the screen */}
      <div className="flex flex-col justify-start h-screen w-screen md:w-1/2">
        <Navbar />
          <a href="#/home" className="md:hidden m-6 bg-white p-2 flex items-center w-16 rounded justify-center text-lg font-medium">skip</a>
        <div className="fixed md:static bottom-0 scroll-my-0">
          <div className="flex flex-col justify-start mx-4 md:mt-32">
            <div className="text-black px-4 md:px-8">
              <h1 className="text-6xl tracking-wider md:tracking-normal md:text-8xl lg:text-8xl font-style p-2 md:p-8 md:mt-24">
                Get the <span className="underline-orange text-orange-600">food</span> recipe
                more easily!
              </h1>

              <div className="px-8 md:mr-32 text-gray-600">
                <p className="font-medium md:text-lg hidden md:block">
                  Find
                  <span> </span>
                  <span className="text-orange-500 font-semibold">
                    10,000+ good & delicious
                  </span>
                  recipes and start your amazing journey to healthy eating with
                  us.
                </p>
              </div>
              <div className="md:hidden">
                <button
                  className="bg-orange-500 text-white border w-full py-2 px-6 md:px-6 rounded-lg border-transparent font-extrabold text-lg shadow mb-4 hover:bg-orange-600"
                  onClick={() => {
                    navigate("/signin");
                  }}
                  aria-label="Login"
                >
                  Login
                </button>
                <button
                  className="text-lg bg-white  text-orange-500 border w-full py-2 px-6 md:px-8 rounded-lg font-extrabold border-transparent shadow hover:bg-gray-100 mb-6"
                  aria-label="Register"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <button
                onClick={() => {
                  navigate("/a");
                }}
                className="bg-orange-500 text-white border py-2 px-6 md:px-8 rounded-lg border-transparent ml-14 mt-4 font-extrabold text-lg shadow mx-0 hover:bg-orange-600"
                aria-label="Login"
              >
                Explore now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background image for larger screens (hidden on mobile) */}
      <div className="w-full md:w-1/2 justify-center mt-8 md:mt-48 bg-image"></div>

      {/* Additional element with bg-image2 */}
      <div className="w-1/12 bg-image2"></div>
    </div>
  );
};

export default LandingPage;
