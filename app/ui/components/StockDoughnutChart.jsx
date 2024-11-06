import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const StockDoughnutChart = ({ shop, count, stockStatusCounts }) => {
  // Define colors for different stock statuses
  const statusColors = {
    "in stock": "#16a34a",
    "out of stock": "#dc2626",
    "pre order": "#eab308",
    "up coming": "#3b82f6",
    "sold out": "#6b7280",
    "call for price": "#8b5cf6",
    discontinued: "#ef4444",
  };

  // Prepare data for the chart
  const labels = Object.keys(stockStatusCounts);
  const data = Object.values(stockStatusCounts);
  const colors = labels.map((status) => statusColors[status]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between gap-4">
        <h3 className="rounded-lg bg-gray-50 px-6 py-3 text-center text-lg font-bold uppercase text-gray-600">
          {shop}
        </h3>
        <h3 className="rounded-lg bg-gray-50 px-6 py-3 text-center text-lg font-bold text-gray-600">
          {count}
        </h3>
      </div>
      <div className="mx-auto mt-5 h-full w-full">
        <Doughnut
          data={{
            labels: labels.map((label) => label.toUpperCase()),
            datasets: [
              {
                data: data,
                backgroundColor: colors,
                borderWidth: 0,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 20,
                  usePointStyle: true,
                  font: {
                    size: 11,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const value = context.raw || 0;
                    const percentage = ((value / count) * 100).toFixed(1);
                    return ` ${value} (${percentage}%)`;
                  },
                },
              },
            },
            cutout: "75%",
          }}
        />
      </div>
    </div>
  );
};

export default StockDoughnutChart;
