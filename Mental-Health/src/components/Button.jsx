// components/Button.js
import React from "react";

function Button({ onClick, children }) {
  return (
    <div className="bg-orange-900 py-3 px-6 flex items-center justify-center rounded-2xl text-white font-semibold text-lg hover:bg-yellow-600 transition duration-300">
      <button onClick={onClick}>{children}</button>
    </div>
  );
}

export default Button;
