import  {useEffect} from "react";
import "../App.css";

const LandingPage = () => {
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
    <div className="flex bg-slate-100 md:slate-50 flex-col md:flex-row relative">

      {/* Background image for mobile (hidden on larger screens) */}
      <div className="w-full fixed inset-0 md:w-1/2 justify-center mt-0 md:mt-48 bg-image-md block md:hidden"></div>

      {/* Left half of the screen */}
      <div className="flex flex-col justify-start h-screen w-screen md:w-1/2">
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

        <div className="fixed md:static bottom-20 scroll-my-0">

        <div className="flex flex-col justify-start mx-4 md:mt-32">
          <div className="text-black px-8">
            <h1 className="text-6xl tracking-wider md:tracking-normal md:text-7xl lg:text-9xl font-style p-2 md:p-8 md:mt-24">
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
            <div className="md:hidden">
              <button
                className="bg-orange-500 text-white border w-full py-2 px-6 md:px-8 rounded-lg border-transparent font-extrabold text-lg shadow mb-4 hover:bg-orange-600"
                aria-label="Login"
              >
                Login
              </button>
              <button
                className="text-lg bg-slate-50 text-orange-500 border w-full py-2 px-6 md:px-8 rounded-lg font-extrabold border-transparent shadow hover:bg-gray-100 mb-6"
                aria-label="Register"
              >
                Register
              </button>
              </div>

            </div>
            <div className="hidden md:block">
                <button
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
