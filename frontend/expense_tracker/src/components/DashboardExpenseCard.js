import React from 'react';

const categoryColors = {
  "Food & Dining": "#f59e0b",
  "Housing": "#3b82f6",
  "Transportation": "#6366f1",
  "Healthcare": "#10b981",
  "Entertainment": "#ec4899",
  "Utilities": "#0ea5e9",
  "Personal Care": "#a855f7",
  "Others": "#64748b",
};

const DashboardExpenseCard = ({ name, amount, category, date }) => {
  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.slice(0, 2).join("").toUpperCase();
  };

  const color = categoryColors[category] || "#64748b";

  return (
    <div className="bg-white shadow-sm hover:shadow-md rounded-2xl p-4 w-full h-28 my-2 mx-0.5 transition-shadow duration-200 border border-gray-100/80">
  <div className="flex items-center mb-4">
    <div className="h-10 w-10 rounded-xl flex justify-center items-center text-white font-semibold text-sm"
         style={{ background: color }}>
      {getInitials(name)}
    </div>
    <h2 className="ml-4 text-base font-semibold text-gray-800 overflow-hidden overflow-ellipsis whitespace-nowrap" style={{ maxWidth: 'calc(100% - 2.5rem)' }}>
      {name}
    </h2> 
  </div>
  <div className="flex flex-col">
    <div className="flex justify-between mb-4">
      <h3 className="ml-0 text-gray-800 font-bold">₹ {amount} </h3>
      <span className="ml-2 px-3 py-0.5 rounded-full text-white text-xs font-medium"
            style={{ background: color }}>
        {category}
      </span>
    </div>
  </div>
</div>

  );
};

export default DashboardExpenseCard;
