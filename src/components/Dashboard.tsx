import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Gamepad2, TrendingUp, DollarSign, Activity, Calendar, BarChart3, PieChart, LineChart } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  revenueData,
  doughnutData,
  chartOptions,
  doughnutOptions,
  generateBarData,
  calculateChartSummary,
  timeRangeOptions,
} from '../utils/chartData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<'line' | 'bar' | 'doughnut'>('line');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [chartSummary, setChartSummary] = useState(calculateChartSummary('30d'));

  // Update chart summary when time range changes
  useEffect(() => {
    setChartSummary(calculateChartSummary(timeRange));
  }, [timeRange]);

  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Agents',
      value: '234',
      change: '+8.2%',
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Game Sessions',
      value: '8,935',
      change: '+23.1%',
      icon: Gamepad2,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Revenue',
      value: '₹45,892',
      change: '+15.3%',
      icon: DollarSign,
      color: 'bg-yellow-500'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New user registration', user: 'john.doe@email.com', time: '2 mins ago' },
    { id: 2, action: 'Lottery game completed', user: 'Game ID: #LT001', time: '5 mins ago' },
    { id: 3, action: 'Agent approved', user: 'agent.smith@email.com', time: '12 mins ago' },
    { id: 4, action: 'Color prediction game', user: 'Game ID: #CP045', time: '18 mins ago' },
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'line':
        return <Line data={revenueData[timeRange]} options={chartOptions} height={300} />;
      case 'bar':
        return <Bar data={generateBarData(timeRange)} options={chartOptions} height={300} />;
      case 'doughnut':
        return <Doughnut data={doughnutData} options={doughnutOptions} height={300} />;
      default:
        return <Line data={revenueData[timeRange]} options={chartOptions} height={300} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center space-x-2">
              {/* Chart Type Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedChart('line')}
                  className={`p-2 rounded-md transition-colors ${
                    selectedChart === 'line' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Line Chart"
                >
                  <LineChart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedChart('bar')}
                  className={`p-2 rounded-md transition-colors ${
                    selectedChart === 'bar' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Bar Chart"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedChart('doughnut')}
                  className={`p-2 rounded-md transition-colors ${
                    selectedChart === 'doughnut' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Doughnut Chart"
                >
                  <PieChart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value as '7d' | '30d' | '90d')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timeRange === option.value ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Revenue Analytics</span>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-80">
            {renderChart()}
          </div>

          {/* Chart Summary */}
          <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-lg font-bold text-gray-900">
                ₹{chartSummary.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Daily</p>
              <p className="text-lg font-bold text-gray-900">
                ₹{chartSummary.averageDaily.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-lg font-bold text-green-600">+{chartSummary.growthRate}%</p>
            </div>
          </div>

          {/* Top Performer */}
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600">
              Top Performer: <span className="font-medium text-gray-900">{chartSummary.topPerformer}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-sky-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{activity.user}</p>
                </div>
                <div className="text-xs text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Game Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-sky-50 to-sky-100 rounded-lg">
            <h3 className="font-semibold text-sky-800">Lottery Games</h3>
            <p className="text-2xl font-bold text-sky-900 mt-2">4,523</p>
            <p className="text-sm text-sky-600">Sessions today</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
            <h3 className="font-semibold text-emerald-800">Big & Small</h3>
            <p className="text-2xl font-bold text-emerald-900 mt-2">2,891</p>
            <p className="text-sm text-emerald-600">Sessions today</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <h3 className="font-semibold text-purple-800">Color Prediction</h3>
            <p className="text-2xl font-bold text-purple-900 mt-2">6,247</p>
            <p className="text-sm text-purple-600">Sessions today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;