import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryCard = ({ category, icon, spends, totalBudget }) => {
  // Calculate percentage spent
  var percentageSpent = (spends / totalBudget) * 100;
  if (percentageSpent > 100) {
    percentageSpent = 100;
  }
  var progess_class =
    percentageSpent < 50
      ? "h-full bg-green-500 rounded-full"
      : percentageSpent < 80
      ? "h-full bg-yellow-500 rounded-full"
      : totalBudget == 0
      ? "h-full bg-gray-200 rounded-full"
      : "h-full bg-red-500 rounded-full";

  // Check screen width
  const isMobile = window.innerWidth <= 768; 

  return (
    <div className={`bg-white shadow-md rounded-xl p-6 w-full my-2 mx-0.5`}>
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 rounded-xl w-10 h-10 flex items-center justify-center text-white">
          <FontAwesomeIcon icon={icon} /> {/* Use FontAwesomeIcon component */}
        </div>
        <h2 className="ml-4 text-lg font-semibold">{category}</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex  justify-between mb-4">
          <h3 className="ml-0 text-gray-600">₹ {spends} </h3>
          <span className="ml-2 text-gray-700">₹ {totalBudget}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full">
          <div
            className={progess_class}
            style={{ width: `${percentageSpent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
