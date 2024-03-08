const RecipeCard = ({ image, name, time }) => (
    <div className="recipe-card min-w-24 bg-slate-200 rounded-md overflow-hidden">
      <div className="bg-white">
        <img
          src={image}
          alt={name}
          className="w-full object-cover mb-0 rounded-t-md justify-center"
        />
      </div>
      <div className="p-2">
        <p className="font-semibold text-sm text-center">{name}</p>
        <p className="text-gray-500 text-center">{time}</p>
      </div>
    </div>
)
export default RecipeCard