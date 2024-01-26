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

import { faker } from "@faker-js/faker";

export default function LineChartCollection({ generalData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "companyies",
      },
    },
  };
  let assetPriceFilteredAndGrouped = [];
  function filterByAssetsPrice(assetprice = "open") {
    let colorCnt = 10;

    generalData.data.map((asset) => {
      let r = faker.number.int({ min: 0, max: 255 });
      console.log(r);
      assetPriceFilteredAndGrouped.push({
        label: asset["companyname"],
        data: asset[assetprice],
        borderColor: `rgb(${r}, ${12 + colorCnt - 3}, 132)`,
        backgroundColor: `rgba(${r}, ${12 + colorCnt - 3}, 132, 0.5)`,
      });

      colorCnt += 35;
    });
    return assetPriceFilteredAndGrouped;
  }
  const data = {
    labels: generalData.labeldata,
    datasets: filterByAssetsPrice(),
  };

  return <Line options={options} data={data} />;
}
