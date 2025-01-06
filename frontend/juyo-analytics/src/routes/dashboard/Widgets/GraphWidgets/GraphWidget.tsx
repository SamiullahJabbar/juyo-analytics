/** routes/dashboard/Widgets/GraphWidget.tsx */

import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
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
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type GraphWidgetProps = {
  chartType: "line" | "bar" | "pie" | "doughnut";
  title: string;
  data: any;
};

export default function GraphWidget({
  chartType,
  title,
  data,
}: GraphWidgetProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        footerColor: "#fff",
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <Line data={data} options={options} />;
      case "bar":
        return <Bar data={data} options={options} />;
      case "pie":
        return <Pie data={data} options={options} />;
      case "doughnut":
        return <Doughnut data={data} options={options} />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gray-100 text-black w-full h-full border border-gray-200 p-8">
      <CardHeader className="border-b border-gray-200 p-4 text-lg font-medium">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody className="w-full h-[95%]">{renderChart()}</CardBody>
    </Card>
  );
}