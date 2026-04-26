import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MyPieChart = ({ stats }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!stats || !chartRef.current) return;

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const ctx = chartRef.current.getContext("2d");

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

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 400,
        },
        onResize: (chart) => {
          chart.options.animation.duration = 0; // No animation during resize
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 10,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                family: 'Inter',
                size: 11,
              },
            },
          },
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            right: 0,
          }
        },
        cutout: '65%',
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [stats]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MyPieChart;
