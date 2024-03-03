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
    <div className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-300 flex justify-around items-center md:hidden">
      <div className="text-center">
        <FontAwesomeIcon icon={faHome} size="2x" color="#D2D2D2" />
        <p className="text-sm">Home</p>
      </div>
      <div className="text-center">
        <FontAwesomeIcon icon={faUtensils} size="2x" color="#D2D2D2" />
        <p className="text-sm">Explore</p>
      </div>
      <div className="text-center">
        <FontAwesomeIcon icon={faPlusCircle} size="2x" color="#D2D2D2" />
        <p className="text-sm">Add Recipe</p>
      </div>
      <div className="text-center">
        <FontAwesomeIcon icon={faUserCircle} size="2x" color="#D2D2D2" />
        <p className="text-sm">Profile</p>
      </div>
    </div>
  );
}
