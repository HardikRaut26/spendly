import React from 'react';

const DashboardExpenseCard = ({ name, amount, category,date }) => {
  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.slice(0, 2).join("").toUpperCase();
  };
 
  return (
    <div className="bg-white shadow-md rounded-xl p-3 w-full h-28 my-2 mx-0.5">
  <div className="flex items-center mb-4">
    <div className="h-10 w-10 bg-gray-500 text-white rounded-xl flex justify-center items-center">
      {getInitials(name)}
    </div>
    <h2 className="ml-4 text-lg  font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap" style={{ maxWidth: 'calc(100% - 2.5rem)' }}>
      {name}
    </h2> 
  </div>
  <div className="flex flex-col">
    <div className="flex justify-between mb-4">
      <h3 className="ml-0 text-gray-600 ">₹ {amount} </h3>
      <span className="ml-2 bg-blue-500 px-2 py-1 rounded-2xl text-white text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
        {category}
      </span>
    </div>
  </div>
</div>

  );
};

export default DashboardExpenseCard;
