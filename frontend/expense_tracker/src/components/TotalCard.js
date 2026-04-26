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
      ? "h-full bg-white rounded-full transition-all duration-500"
      : percentageSpent < 80
      ? "h-full bg-amber-300 rounded-full transition-all duration-500"
      : "h-full bg-red-400 rounded-full transition-all duration-500";
      
      const isMobile = window.innerWidth <= 768; 
      var div_class = isMobile ? "shadow-lg rounded-2xl p-6 w-full h-56 my-0.5 mx-0.5" : "shadow-lg rounded-2xl p-6 w-96 h-56 my-0.5 mx-0.5";
  return (
    <div className="flex">
      
      <div className={div_class} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)' }}>
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold text-white/90">Monthly Spends</h2>
        </div>
        <div className="flex flex-col">
          <div className="flex  justify-between mb-4">
            <h3 className="ml-0 text-white font-bold text-xl">₹ {spends} </h3>
            <span className="ml-2 text-white/60 font-medium">/ ₹ {totalBudget}</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full backdrop-blur-sm">
            <div
              className={progess_class}
              style={{ width: `${percentageSpent}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 my-4 border border-white/10">
        <div className="flex items-center mb-1">
          <h2 className="text-sm font-medium text-white/70">All Time Spends</h2>
        </div>
        <div className="flex align-bottom">
          <h3 className="ml-0 text-white font-bold text-lg">₹ {allTotalSpends} </h3>
        </div>
      </div>

      </div>
    </div>
  );
};

export default TotalCard;
