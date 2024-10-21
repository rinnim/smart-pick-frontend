"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// Register required components of Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Define the PriceTimelineChart component
const PriceTimelineChart = ({ priceTimeline }) => {
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setFontSize(12);
      } else if (window.innerWidth <= 1024) {
        setFontSize(14);
      } else {
        setFontSize(16);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format data for the chart
  const chartData = {
    labels: priceTimeline.map((entry) => {
      const date = new Date(entry.date);
      return date.toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }),
    datasets: [
      {
        label: "Price",
        data: priceTimeline.map((entry) => entry.price), // Extract price values
        borderColor: "#e5e7eb",
        backgroundColor: "#1d4ed8",
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false,
          text: "Date",
        },
        ticks: {
          font: {
            size: fontSize,
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: false,
          text: "Price ৳",
        },
        ticks: {
          font: {
            size: fontSize,
          },
        },
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            const date = new Date(
              priceTimeline[tooltipItem.dataIndex].date,
            ).toLocaleDateString("default", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const price = tooltipItem.raw;
            const previousPrice =
              priceTimeline[tooltipItem.dataIndex - 1]?.price; // Get the previous price for percentage calculation
            const percentageChange = previousPrice
              ? (((price - previousPrice) / previousPrice) * 100).toFixed(2)
              : 0;

            return [
              `Price: ৳${price}`,
              `Change: ${percentageChange > 0 ? "+" : ""}${percentageChange}%`,
            ];
          },
        },
        titleAlign: "center",
        bodyAlign: "center",
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PriceTimelineChart;
