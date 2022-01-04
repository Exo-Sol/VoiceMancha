import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ mancha }) => {
  const chartData = {
    labels: mancha.map((e) => {
      return `${e.timeObj.hour}:${e.timeObj.minutes}`;
    }),
    datasets: [
      {
        label: "KN",
        data: mancha.map((e) => {
          return e.manch;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        maxBarThickness: 100,
      },
    ],
  };

  return <Bar data={chartData} height={"200px"} />;
};

export default BarChart;
