import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TotalCard = ({ spends, totalBudget, allTotalSpends }) => {
  // Calculate percentage spent
  var percentageSpent = (spends / totalBudget) * 100;
  if(percentageSpent>100){
    percentageSpent=100;
  }
  var progess_class =
    percentageSpent < 50
      ? "h-full bg-white rounded-full"
      : percentageSpent < 80
      ? "h-full bg-yellow-500 rounded-full"
      : "h-full bg-red-500 rounded-full";
      
      const isMobile = window.innerWidth <= 768; 
      var div_class = isMobile ? "bg-blue-600 shadow-md rounded-xl p-6 w-full h-56  my-0.5 mx-0.5" : "bg-blue-600 shadow-md rounded-xl p-6 w-96 h-56  my-0.5 mx-0.5";
  return (
    <div className="flex">
      
      <div className={div_class}>
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Monthly Spends</h2>
        </div>
        <div className="flex flex-col">
          <div className="flex  justify-between mb-4">
            <h3 className="ml-0 text-white">₹ {spends} </h3>
            <span className="ml-2 text-white">₹ {totalBudget}</span>
          </div>
          <div className="h-3 bg-gray-300 rounded-full">
            <div
              className={progess_class}
              style={{ width: `${percentageSpent}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2  my-4">
        <div className="flex items-center mb-1">
          <h2 className="text-lg font-semibold text-black">All Time Spends</h2>
        </div>
        <div className="flex align-bottom">
          <h3 className="ml-0 text-black">₹ {allTotalSpends} </h3>
        </div>
      </div>

      </div>
    </div>
  );
};

export default TotalCard;
