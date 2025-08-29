// Chart data utilities for revenue analytics
export interface RevenueData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }[];
}

export interface ChartSummary {
  totalRevenue: number;
  averageDaily: number;
  growthRate: number;
  topPerformer: string;
}

// Color scheme for different game types
export const gameColors = {
  lottery: {
    border: 'rgb(59, 130, 246)',
    background: 'rgba(59, 130, 246, 0.1)',
    solid: 'rgba(59, 130, 246, 0.8)',
  },
  bigsmall: {
    border: 'rgb(147, 51, 234)',
    background: 'rgba(147, 51, 234, 0.1)',
    solid: 'rgba(147, 51, 234, 0.8)',
  },
  color: {
    border: 'rgb(249, 115, 22)',
    background: 'rgba(249, 115, 22, 0.1)',
    solid: 'rgba(249, 115, 22, 0.8)',
  },
};

// Revenue data for different time periods
export const revenueData: Record<string, RevenueData> = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Lottery Revenue',
        data: [12500, 18900, 15600, 23400, 28700, 32100, 28900],
        borderColor: gameColors.lottery.border,
        backgroundColor: gameColors.lottery.background,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Big & Small Revenue',
        data: [8900, 12300, 9800, 15600, 18900, 23400, 20100],
        borderColor: gameColors.bigsmall.border,
        backgroundColor: gameColors.bigsmall.background,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Color Prediction Revenue',
        data: [6700, 8900, 7200, 12300, 15600, 18900, 16700],
        borderColor: gameColors.color.border,
        backgroundColor: gameColors.color.background,
        fill: true,
        tension: 0.4,
      },
    ],
  },
  '30d': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Lottery Revenue',
        data: [89000, 123000, 156000, 189000],
        borderColor: gameColors.lottery.border,
        backgroundColor: gameColors.lottery.background,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Big & Small Revenue',
        data: [67000, 89000, 123000, 156000],
        borderColor: gameColors.bigsmall.border,
        backgroundColor: gameColors.bigsmall.background,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Color Prediction Revenue',
        data: [45000, 67000, 89000, 123000],
        borderColor: gameColors.color.border,
        backgroundColor: gameColors.color.background,
        fill: true,
        tension: 0.4,
      },
    ],
  },
  '90d': {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    datasets: [
      {
        label: 'Lottery Revenue',
        data: [456000, 567000, 678000],
        borderColor: gameColors.lottery.border,
        backgroundColor: gameColors.lottery.background,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Big & Small Revenue',
        data: [345000, 456000, 567000],
        borderColor: gameColors.bigsmall.border,
        backgroundColor: gameColors.bigsmall.background,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Color Prediction Revenue',
        data: [234000, 345000, 456000],
        borderColor: gameColors.color.border,
        backgroundColor: gameColors.color.background,
        fill: true,
        tension: 0.4,
      },
    ],
  },
};

// Doughnut chart data for revenue distribution
export const doughnutData = {
  labels: ['Lottery Games', 'Big & Small', 'Color Prediction'],
  datasets: [
    {
      data: [678000, 567000, 456000], // Total revenue for each game type
      backgroundColor: [
        gameColors.lottery.solid,
        gameColors.bigsmall.solid,
        gameColors.color.solid,
      ],
      borderColor: [
        gameColors.lottery.border,
        gameColors.bigsmall.border,
        gameColors.color.border,
      ],
      borderWidth: 2,
    },
  ],
};

// Calculate chart summary statistics
export const calculateChartSummary = (timeRange: string): ChartSummary => {
  const data = revenueData[timeRange];
  const totalRevenue = data.datasets.reduce((sum, dataset) => 
    sum + dataset.data[dataset.data.length - 1], 0
  );
  
  const averageDaily = Math.round(
    data.datasets.reduce((sum, dataset) => 
      sum + dataset.data.reduce((a, b) => a + b, 0), 0
    ) / data.labels.length
  );

  // Find top performer
  const topPerformer = data.datasets.reduce((top, current) => 
    current.data[current.data.length - 1] > top.data[top.data.length - 1] ? current : top
  ).label;

  return {
    totalRevenue,
    averageDaily,
    growthRate: 15.3, // This could be calculated from historical data
    topPerformer,
  };
};

// Chart options for different chart types
export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context: any) {
          return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          size: 12,
        },
        callback: function(value: any) {
          return '₹' + value.toLocaleString();
        },
      },
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
};

// Doughnut chart options
export const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: function(context: any) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((context.parsed / total) * 100).toFixed(1);
          return `${context.label}: ₹${context.parsed.toLocaleString()} (${percentage}%)`;
        },
      },
    },
  },
};

// Generate bar chart data from line chart data
export const generateBarData = (timeRange: string) => {
  const data = revenueData[timeRange];
  return {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      fill: false,
      tension: 0,
    })),
  };
};

// Time range options
export const timeRangeOptions = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
];

// Chart type options
export const chartTypeOptions = [
  { value: 'line', label: 'Line Chart', icon: 'LineChart' },
  { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
  { value: 'doughnut', label: 'Doughnut Chart', icon: 'PieChart' },
];
