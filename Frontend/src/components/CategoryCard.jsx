import React from "react";

const CategoryCard = ({ category, isSelected, onClick }) => (
  <div className="mr-4 min-w-16 min-h-16 flex items-center">
    <div className="flex flex-col">
      <div
        className={`rounded-full shadow-lg bg-slate-50 p-1 cursor-pointer ${
          isSelected ? "border-2 border-blue-500" : ""
        }`}
        onClick={() => onClick(category.strCategory)}
      >
        <img
          src={category.strCategoryThumb}
          alt=""
          className="rounded-full min-w-14 min-h-14 object-cover"
        />
      </div>
      <p className="text-center p-1.5">{category.strCategory}</p>
    </div>
  </div>
);

export default CategoryCard;
