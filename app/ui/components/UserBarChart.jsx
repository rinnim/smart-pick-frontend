import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserBarChart = ({ usersByDate, totalUsers }) => {
  // Format dates to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const data = {
    labels: usersByDate?.map(item => formatDate(item.date)),
    datasets: [
      {
        label: 'New Users',
        data: usersByDate?.map(item => item.count),
        backgroundColor: '#60a5fa', // blue-400
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'User Registrations by Date',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex mb-4 w-full items-center justify-between gap-4">
        <h3 className="rounded-lg bg-gray-50 px-6 py-3 text-center text-lg font-bold  text-gray-600">
          Users
        </h3>
        <h3 className="rounded-lg bg-gray-50 px-6 py-3 text-center text-lg font-bold text-gray-600">
          {totalUsers || 0}
        </h3>
      </div>
        <div className="w-full h-full">
          <Bar data={data} options={options} height="100%" />
        </div>
    </div>
  );
};

export default UserBarChart; 