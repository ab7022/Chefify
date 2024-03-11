const RecipeCard = ({ image, name, category, area }) => (
  <div className="recipe-card min-w-24 max-h-66 bg-slate-200 rounded-md overflow-hidden border border-slate-300">
    <div className="bg-white">
      <img
        src={image}
        alt={name}
        className="max-h-24 max-w-24 object-cover mb-0 rounded-t-md justify-center "
      />
    </div>
    <div className="p-2">
      <div className="dish-name-container h-8"> {/* Set a fixed height, adjust as needed */}
        <p className="font-medium text-xs text-center overflow-hidden overflow-ellipsis line-clamp-2">
          {name}
        </p>
      </div>

      {category && (
        <p className="text-center text-small bg-blue-200 rounded-xl mt-4 p-0.5">
          {category}
        </p>
      )}
      {area && (
        <p className="text-center text-small bg-purple-200 rounded-xl mt-1 p-0.5">
          {area}
        </p>
      )}
    </div>
  </div>
);
export default RecipeCard;
