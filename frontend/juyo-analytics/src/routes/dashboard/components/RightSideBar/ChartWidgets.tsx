import React from "react";
import GraphWidget from "../../Widgets/GraphWidgets/GraphWidget";
import { WidgetProps } from "../../types";

const chartExamples = [
  {
    key: "chart1",
    type: "chart",
    chartType: "line",
    title: "Sales Over Time",
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales",
          data: [65, 59, 80, 81, 56, 55],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    },
    itemLayout: {
      i: "1",
      x: 0,
      y: 0,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart2",
    type: "chart",
    chartType: "bar",
    title: "Revenue by Product",
    data: {
      labels: ["Product A", "Product B", "Product C", "Product D"],
      datasets: [
        {
          label: "Revenue",
          data: [300, 500, 100, 400],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    itemLayout: {
      i: "2",
      x: 4,
      y: 0,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart3",
    type: "chart",
    chartType: "pie",
    title: "Market Share",
    data: {
      labels: ["Company A", "Company B", "Company C"],
      datasets: [
        {
          label: "Market Share",
          data: [40, 30, 30],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    itemLayout: {
      i: "3",
      x: 8,
      y: 0,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart4",
    type: "chart",
    chartType: "doughnut",
    title: "Expenses Breakdown",
    data: {
      labels: ["Rent", "Utilities", "Salaries", "Miscellaneous"],
      datasets: [
        {
          label: "Expenses",
          data: [500, 200, 300, 100],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    itemLayout: {
      i: "4",
      x: 0,
      y: 4,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart5",
    type: "chart",
    chartType: "line",
    title: "Website Traffic",
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      datasets: [
        {
          label: "Visitors",
          data: [200, 300, 250, 400, 350],
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
        },
      ],
    },
    itemLayout: {
      i: "5",
      x: 4,
      y: 4,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart6",
    type: "chart",
    chartType: "bar",
    title: "Monthly Expenses",
    data: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Expenses",
          data: [400, 300, 500, 200, 300],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    itemLayout: {
      i: "6",
      x: 8,
      y: 4,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart7",
    type: "chart",
    chartType: "pie",
    title: "Customer Satisfaction",
    data: {
      labels: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
      datasets: [
        {
          label: "Satisfaction",
          data: [50, 30, 10, 10],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    itemLayout: {
      i: "7",
      x: 0,
      y: 8,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart8",
    type: "chart",
    chartType: "doughnut",
    title: "Project Status",
    data: {
      labels: ["Completed", "In Progress", "Pending"],
      datasets: [
        {
          label: "Status",
          data: [60, 30, 10],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    itemLayout: {
      i: "8",
      x: 4,
      y: 8,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart9",
    type: "chart",
    chartType: "line",
    title: "Temperature Variation",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Temperature",
          data: [30, 25, 27, 28, 32, 35, 36, 34, 30, 28, 26, 24],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    },
    itemLayout: {
      i: "9",
      x: 8,
      y: 8,
      w: 4,
      h: 4,
    },
  },
  {
    key: "chart10",
    type: "chart",
    chartType: "bar",
    title: "Quarterly Profits",
    data: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Profits",
          data: [15000, 20000, 18000, 22000],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    itemLayout: {
      i: "10",
      x: 0,
      y: 12,
      w: 4,
      h: 4,
    },
  },
];

export default function ChartWidgets({ addGridItem }) {
  return (
    <div className="chart-widgets">
      {chartExamples.map((example, index) => (
        <div
          key={index}
          className="chart-widget-item bg-gray-600 text-white rounded p-2 mb-2 cursor-pointer"
          onClick={() =>
            addGridItem(
              {
                type: "chart",
                title: example.title,
                chartType: example.chartType,
                data: example.data,
              },
              <GraphWidget
                chartType={example.chartType}
                title={example.title}
                data={example.data}
              />,
              example.itemLayout
            )
          }
        >
          <h3>{example.title}</h3>
        </div>
      ))}
    </div>
  );
}
