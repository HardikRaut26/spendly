import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MyPieChart = ({ stats }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!stats) return;

    const ctx = chartRef.current.getContext("2d");

    // Prepare your data for the doughnut chart
    const data = {
      labels: ["Food & Dining", "Housing", "Transportation", "Healthcare", "Entertainment", "Utilities", "Personal Care", "Others"],
      datasets: [{
        data: [
          (stats?.categorySpends["Food & Dining"] / stats?.totalMonthlySpend) * 100,
          (stats?.categorySpends["Housing"] / stats?.totalMonthlySpend) * 100,
          (stats?.categorySpends["Transportation"] / stats?.totalMonthlySpend) * 100,
          (stats?.categorySpends["Healthcare"] / stats?.totalMonthlySpend) * 100,
          (stats?.categorySpends["Entertainment"] / stats?.totalMonthlySpend) * 100,
          (stats?.categorySpends["Utilities"] / stats?.totalMonthlySpend) * 100,
          (stats?.categorySpends["Personal Care"] / stats?.totalMonthlySpend) * 100,
          (stats?.categorySpends["Others"] / stats?.totalMonthlySpend) * 100,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF8C9A",
          "#8BE87B",
          "#CDA776",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF8C9A",
          "#8BE87B",
          "#CDA776",
        ],
      }],
    };

    // Create the doughnut chart
    new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        plugins: {
          legend: {
            position: 'right', // Position legend to the right
          },
        },
        layout: {
          padding: {
            top:30,
            bottom: 30, // Add padding to the left of the chart
            right: 0, // Add padding to the right of the chart
          }
        },
        aspectRatio: 2, 
        maintainAspectRatio: false, 
      },
    });
  }, [stats]);

  return (
    
        <canvas ref={chartRef}></canvas>
  
  );
};

export default MyPieChart;
