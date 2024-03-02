export default function Navbar() {
  return (
    <header className="flex justify-between items-center md:p-8 md:px-24 fixed top-0 bg-gray-100 w-full shadow-lg hidden md:block md:flex">
      <div className="logo text-5xl font-bold">Foodiee</div>
      <nav className="flex flex-row space-x-6 font-medium text-xl">
        <a href="#/a" className="nav-link hover:underline">
          Home
        </a>
        <a href="#/a" className="nav-link hover:underline hover:text-orange-500">
          Recipes
        </a>
        <a href="#/a" className="nav-link hover:underline hover:text-orange-500">
          Add Recipe
        </a>
        <a href="#" className="nav-link hover:underline hover:text-orange-500">
          Profile
        </a>
      </nav>
      <div>
        <a
          href="#/a"
          className="nav-link bg-orange-500 hover:bg-orange-600 py-3 px-5 text-white rounded-md font-semibold"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
}
