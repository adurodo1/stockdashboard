import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

import { faker } from "@faker-js/faker";

export default function RadarCollection({ generalData }) {
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

      assetPriceFilteredAndGrouped.push({
        label: asset["companyname"],
        fill: true,
        data: asset[assetprice],
        borderColor: `rgb(${r}, ${12 + colorCnt - 3}, 132)`,
        backgroundColor: `rgba(${r}, ${12 + colorCnt - 3}, 132, 0.5)`,
        pointBackgroundColor: `rgb(${r}, ${12 + colorCnt - 3}, 132)`,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: `rgb(${r}, ${12 + colorCnt - 3}, 132)`,
      });

      colorCnt += 35;
    });
    return assetPriceFilteredAndGrouped;
  }
  const data = {
    labels: generalData.labeldata,
    datasets: filterByAssetsPrice(),
  };

  return <Radar data={data} options={options} />;
}
