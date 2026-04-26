import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categoryColors = {
  "Food & Dining": { bg: "#fef3c7", icon: "#f59e0b", text: "#92400e" },
  "Housing": { bg: "#dbeafe", icon: "#3b82f6", text: "#1e40af" },
  "Transportation": { bg: "#e0e7ff", icon: "#6366f1", text: "#3730a3" },
  "Healthcare": { bg: "#d1fae5", icon: "#10b981", text: "#065f46" },
  "Entertainment": { bg: "#fce7f3", icon: "#ec4899", text: "#9d174d" },
  "Utilities": { bg: "#e0f2fe", icon: "#0ea5e9", text: "#0c4a6e" },
  "Personal Care": { bg: "#f3e8ff", icon: "#a855f7", text: "#6b21a8" },
  "Others": { bg: "#f1f5f9", icon: "#64748b", text: "#334155" },
};

const CategoryCard = ({ category, icon, spends, totalBudget }) => {
  // Calculate percentage spent
  var percentageSpent = (spends / totalBudget) * 100;
  if (percentageSpent > 100) {
    percentageSpent = 100;
  }

  const colors = categoryColors[category] || categoryColors["Others"];

  var progressColor =
    percentageSpent < 50
      ? "#10b981"
      : percentageSpent < 80
      ? "#f59e0b"
      : totalBudget == 0
      ? "#e2e8f0"
      : "#ef4444";

  // Check screen width
  const isMobile = window.innerWidth <= 768; 

  return (
    <div className="bg-white shadow-sm hover:shadow-md rounded-2xl p-5 w-full my-2 mx-0.5 transition-shadow duration-200 border border-gray-100/80">
      <div className="flex items-center mb-4">
        <div className="rounded-xl w-10 h-10 flex items-center justify-center text-white"
             style={{ background: colors.icon }}>
          <FontAwesomeIcon icon={icon} /> {/* Use FontAwesomeIcon component */}
        </div>
        <h2 className="ml-4 text-base font-semibold text-gray-800">{category}</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex  justify-between mb-3">
          <h3 className="ml-0 text-gray-800 font-bold">₹ {spends} </h3>
          <span className="ml-2 text-gray-400 text-sm font-medium">/ ₹ {totalBudget}</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentageSpent}%`, background: progressColor }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
