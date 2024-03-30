export default function Navbar() {
  return (
    <header className=" justify-between items-center md:p-8 md:px-24 fixed top-0 bg-gray-100 w-full shadow-lg hidden  md:flex z-50">
      <div className="logo text-5xl font-bold">Foodiee</div>
      <nav className="flex flex-row space-x-6 font-medium text-xl">
        <a href="#/" className="nav-link hover:underline">
          Home
        </a>
        <a
          href="#/explore"
          className="nav-link hover:underline hover:text-orange-500"
        >
          Explore Recipes
        </a>
        <a
          href="#/addrecipe"
          className="nav-link hover:underline hover:text-orange-500"
        >
          Add Recipe
        </a>
        <a
          href="#/profile"
          className="nav-link hover:underline hover:text-orange-500"
        >
          My Profile
        </a>
      </nav>
      <div>
        <a
          href="#/a"
          className="nav-link bg-orange-500 hover:bg-orange-600 py-3 px-7 text-white rounded-md font-semibold"
        >
          Login
        </a>
      </div>
    </header>
  );
}





