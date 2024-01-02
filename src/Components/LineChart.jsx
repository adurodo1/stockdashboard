import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ generalData, company }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: company,
      },
    },
  };
  const data = {
    labels: generalData.labeldata,
    datasets: [
      {
        label: "Open",
        data: generalData.open,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "High",
        data: generalData.high,
        borderColor: "rgb(99, 255, 132)",
        backgroundColor: "rgba(99, 255, 132, 0.5)",
      },
      {
        label: "Low",
        data: generalData.low,
        borderColor: "rgb(0, 199, 132)",
        backgroundColor: "rgba(0, 199, 132, 0.5)",
      },
      {
        label: "Close",
        data: generalData.close,
        borderColor: "rgb(132, 99, 255)",
        backgroundColor: "rgba(132, 99, 255), 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
