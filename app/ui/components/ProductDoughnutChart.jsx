import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductDoughnutChart = ({ shops, totalProducts, totalShops }) => {
  const colors = ["#4ade80", "#60a5fa", "#f472b6"];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="mb-6 flex w-full items-center justify-between">
          <div className="rounded-lg bg-gray-50 px-6 py-3 text-center">
            <h3 className="text-lg font-bold text-gray-600">Total Shops</h3>
            <p className="text-3xl font-bold text-gray-900">{totalShops || 0}</p>
          </div>
          <div className="rounded-lg bg-gray-50 px-6 py-3 text-center">
            <h3 className="text-lg font-bold text-gray-600">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900">{totalProducts || 0}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-[35%] h-[35%]">
        <Doughnut
          data={{
            labels: shops?.map((shop) => shop.shop.toUpperCase()),
            datasets: [
              {
                data: shops?.map((shop) => shop.count),
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
                },
              },
              title: {
                display: false,
                text: "Products Distribution by Shop",
                padding: {
                  bottom: 15,
                },
                font: {
                  size: 16,
                  weight: "bold",
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

export default ProductDoughnutChart;
