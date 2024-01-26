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

const Home = ({
  toggleOHLCandVolume,
  graphData,
  companySymbol,
  volumeData,
  ti_graphData,
  technicalIndicator,
  timeseriestoview,
}) => {
  return (
    <>
      <div className="right">
        <p>
          <span className="ohlc" onClick={(e) => toggleOHLCandVolume(e.target)}>
            OHLC
          </span>
          <span
            className="volume"
            onClick={(e) => toggleOHLCandVolume(e.target)}
          >
            Volume
          </span>
        </p>
        {timeseriestoview === "ohlc" ? (
          <>
            <div className="line_graph">
              {graphData ? (
                <LineChart generalData={graphData} company={companySymbol} />
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          <>
            <div className="line_graph">
              {graphData ? (
                <BarChart volumeData={volumeData} company={companySymbol} />
              ) : (
                ""
              )}
            </div>
          </>
        )}
        <div className="line_graph">
          {ti_graphData ? (
            <TILineChart
              generalData={ti_graphData}
              company={companySymbol + " " + technicalIndicator}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
