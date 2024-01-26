import { useEffect, useMemo, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Searchbox from "./Components/Searchbox";
import {
  searchCompanyNews,
  searchTehnicalIndicators,
  searchTimeSeries,
  synthesizeMonthlyData,
  synthesizeTechnicalData,
} from "./utilities/alphavantageHelpers";
import TimeSlider from "./Components/TimeSlider";
import LineChart from "./Components/LineChart";
import BarChart from "./Components/BarChart";
import News from "./Components/News";
import TimeSeriesSelecter from "./Components/TimeSeriesSelecter";
import IntervalSelecter from "./Components/IntervalSelecter";
import TechnicalIndicatorSelector from "./Components/TechnicalIndicatorSelector";
import TILineChart from "./Components/TILineChart";
import LineChartCollection from "./Components/LineChartCollection";
import RadarCollection from "./Components/RadarCollection";

const CompareStocks = ({ graphData }) => {
  return (
    <>
      <div className="right">
        <div className="line_graph">
          {graphData ? <LineChartCollection generalData={graphData} /> : ""}
        </div>
        <div className="line_graph">
          {graphData ? <RadarCollection generalData={graphData} /> : ""}
        </div>
      </div>
    </>
  );
};

export default CompareStocks;
