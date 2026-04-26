// ChipSlider.js

import React from "react";
import moment from "moment";
import "./chipSlider.css";

const ChipSlider = ({ activeMonth, setActiveMonth }) => {
  // Function to get the previous 5 months
  const getPreviousMonths = () => {
    const months = [];
    let currentDate = moment();
   

    for (let i = 0; i <= 5; i++) { // Start from 1 to exclude the current month
      const previousMonth = currentDate.clone().subtract(i, "months");
      months.push({
        month: previousMonth.format("MMMM YYYY"),
        year: previousMonth.year(),
        fullDate: previousMonth.toISOString(),
      });
    }
    return months;// Reverse the array to display in descending order
  };

  const months = getPreviousMonths();

  return (
    <div className="chip-slider">
      {months.map((month, index) => (
        <div
          className={`chip ${moment(month.fullDate).isSame(moment(activeMonth), 'month') ? 'active' : ''}`}
          key={index}
          // Set the clicked month as active
          onClick={() => setActiveMonth(month.fullDate)}
        >
          {/* Display only the name of the month */}
          {month.month}
        </div>
      ))}
    </div>
  );
};

export default ChipSlider;
