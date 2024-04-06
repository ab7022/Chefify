import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faUtensils,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 w-full h-14 bg-white border-t border-gray-300 flex justify-around items-center md:hidden">
      <Link to="/a">
        <div className="text-center">
          <FontAwesomeIcon icon={faHome} size="xl" color={location.pathname === "/a" ? "#e39b59" : "#7b7b7b"} />
          <p className={`text-sm ${location.pathname === "/a" ? "text-orange-500" : "text-gray-600"}`}>Home</p>
        </div>
      </Link>
      <Link to="/explore">
        <div className="text-center">
          <FontAwesomeIcon icon={faUtensils} size="xl" color={location.pathname === "/explore" ? "#e39b59" : "#7b7b7b"} />
          <p className={`text-sm ${location.pathname === "/explore" ? "text-orange-500" : "text-gray-600"}`}>Explore</p>
        </div>
      </Link>
      <Link to="/AiSearch">
        <div className="text-center">
          <FontAwesomeIcon icon={faSearch} size="xl" color={location.pathname === "/AiSearch" ? "#e39b59" : "#8c65db"} />
          <p className={`text-sm ${location.pathname === "/AiSearch" ? "text-orange-500" : "text-purple-700"}`}>AI Search</p>
        </div>
      </Link>
      <Link to="/profile">
        <div className="text-center">
          <FontAwesomeIcon icon={faUserCircle} size="xl" color={location.pathname === "/profile" ? "#e39b59" : "#7b7b7b"} />
          <p className={`text-sm ${location.pathname === "/profile" ? "text-orange-500" : "text-gray-600"}`}>Profile</p>
        </div>
      </Link>
    </div>
  );
}1
