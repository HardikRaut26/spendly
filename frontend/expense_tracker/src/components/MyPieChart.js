import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MyPieChart = ({ stats }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!stats) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

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
          "#f59e0b",
          "#3b82f6",
          "#6366f1",
          "#10b981",
          "#ec4899",
          "#0ea5e9",
          "#a855f7",
          "#64748b",
        ],
        hoverBackgroundColor: [
          "#d97706",
          "#2563eb",
          "#4f46e5",
          "#059669",
          "#db2777",
          "#0284c7",
          "#9333ea",
          "#475569",
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      }],
    };

    // Create the doughnut chart
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                family: 'Inter',
                size: 12,
              },
            },
          },
        },
        layout: {
          padding: {
            top: 30,
            bottom: 30,
            right: 0,
          }
        },
        aspectRatio: 2, 
        maintainAspectRatio: false, 
        cutout: '65%',
      },
    });
  }, [stats]);

  return (
    
        <canvas ref={chartRef}></canvas>
  
  );
};

export default MyPieChart;
