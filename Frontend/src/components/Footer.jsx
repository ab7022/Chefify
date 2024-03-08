import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlusCircle,
  faUserCircle,
  faUtensils,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full h-14 bg-white border-t border-gray-300 flex justify-around items-center md:hidden">
      <Link to="/a">
        <div className="text-center">
          <FontAwesomeIcon icon={faHome} size="xl" color="#D2D2D2" />
          <p className="text-sm">Home</p>
        </div>
      </Link>
      <Link to="/explore">
        <div className="text-center">
          <FontAwesomeIcon icon={faUtensils} size="xl" color="#D2D2D2" />
          <p className="text-sm">Explore</p>
        </div>
      </Link>
      <Link to="/addrecipe">
        <div className="text-center">
          <FontAwesomeIcon icon={faPlusCircle} size="xl" color="#D2D2D2" />
          <p className="text-sm">Add Recipe</p>
        </div>
      </Link>
      <Link to="/profile">
        <div className="text-center">
          <FontAwesomeIcon icon={faUserCircle} size="xl" color="#D2D2D2" />
          <p className="text-sm">Profile</p>
        </div>
      </Link>
    </div>
  );
}
