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
import Layout from "./Layout";
import Home from "./Home";
import TechnicalIndex from "./TechnicalIndex";
import CompareStocks from "./CompareStocks";

function App() {
  // console.log("App Rendered");

  const [companySymbol, setCompanySymbol] = useState("AAPL");
  const [groupCompanySymbol, setGroupCompanySymbol] = useState("");

  const [companyData, setCompanyData] = useState();
  const [companyNews, setCompanyNews] = useState();
  const [timeseries, setTimeSeries] = useState();
  const [interval, setInterval] = useState();
  const [slider1value, setSlider1value] = useState(0);
  const [slider2value, setSlider2value] = useState(25);
  const [graphData, setGraphData] = useState();
  const [volumeData, setVolumeData] = useState();

  const [groupedgraphData, setGroupedGraphData] = useState();

  //states to controll viewing

  const [timeseriestoview, setTimeSeriesToView] = useState("ohlc");
  //Other components set up
  const timeintervals = ["1min", "5min", "30min", "60min"];

  const [intervalComponentState, SetIntervalComponentState] = useState(false);

  const searchBoxProps = useMemo(() => {
    return { companySymbol, setCompanySymbol };
  }, [companySymbol, setCompanySymbol]);

  useEffect(() => {
    async function monthlySearch() {
      if (companySymbol === "") return;

      const results = await searchTimeSeries(
        companySymbol,
        "TIME_SERIES_MONTHLY"
      );
      setCompanyData(results);
    }

    async function companyNews() {
      if (companySymbol === "") return;
      const results = await searchCompanyNews(companySymbol);

      setCompanyNews(results);
    }

    companyNews();
    monthlySearch();
  }, [companySymbol]);

  useEffect(() => {
    async function main() {
      if (companyData === undefined) return;
      let results = await synthesizeMonthlyData(
        companyData,
        slider1value,
        slider2value
      );
      setGraphData(results[0]);
      setVolumeData(results[1]);
    }
    main();
  }, [slider1value, slider2value, companyData]);

  async function selectTimeSeriesHandler(time) {
    //get data
    //call appropriate url
    if (time === "") return;

    if (time === "TIME_SERIES_INTRADAY") SetIntervalComponentState(true);
    else SetIntervalComponentState(false);

    setTimeSeries(() => time);

    const results = await searchTimeSeries(companySymbol, time);
    setCompanyData(results);
  }

  async function selectIntervalHandler(inv) {
    //get data
    //call appropriate url
    if (inv === "") return;
    setInterval(() => inv);
    console.log(interval);
    const results = await searchTimeSeries(companySymbol, timeseries, inv);
    setCompanyData(results);
  }

  function toggleOHLCandVolume(selector) {
    let classname = selector.className;
    setTimeSeriesToView(classname);
  }

  ////////////////////////Technical Indicator /////////////////////////////////

  const [technicalIndicator, setTechnicalIndicator] = useState("OBV");
  const [ti_graphData, setTiGraphData] = useState();

  const [ti_interval, setTiInterval] = useState("weekly");

  const [ti_companyData, setTiCompanyData] = useState();

  const ti_timeintervals = [
    "1min",
    "5min",
    "30min",
    "60min",
    "daily",
    "weekly",
    "monthly",
  ];

  async function selectTechnicalIndicatorHandler(ti) {
    //get data
    //call appropriate url
    if (ti === "") return;
    console.log(ti);
    setTechnicalIndicator(ti);
    const results = await searchTehnicalIndicators(
      companySymbol,
      ti,
      ti_interval
    );
    setTiCompanyData(results);
  }

  async function selectIntervalHandlerTI(inv) {
    //get data
    //call appropriate url
    if (inv === "") return;
    setTiInterval(() => inv);
    console.log(interval);
    const results = await searchTehnicalIndicators(
      companySymbol,
      technicalIndicator,
      inv
    );
    setTiCompanyData(results);
  }

  useEffect(() => {
    async function main() {
      if (companySymbol === "") return;

      const results = await searchTehnicalIndicators(
        companySymbol,
        technicalIndicator,
        ti_interval
      );
      setTiCompanyData(results);
    }

    main();
  }, [companySymbol]);
  useEffect(() => {
    async function main() {
      if (ti_companyData === undefined) return;
      let results = await synthesizeTechnicalData(ti_companyData);
      // console.log(results);
      setTiGraphData(() => results);
    }
    main();
  }, [ti_companyData]);

  ///Groups

  const [slider1valueGroup, setSlider1valueGroup] = useState(0);
  const [slider2valueGroup, setSlider2valueGroup] = useState(25);
  const searchBoxPropsforGroups = useMemo(() => {
    return { groupCompanySymbol, setGroupCompanySymbol };
  }, [groupCompanySymbol, setGroupCompanySymbol]);

  ///

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          searchBoxProps={searchBoxProps}
          searchBoxPropsforGroups={searchBoxPropsforGroups}
          slider1value={slider1value}
          setSlider1value={setSlider1value}
          slider2value={slider2value}
          setSlider2value={setSlider2value}
          timeintervals={timeintervals}
          selectTechnicalIndicatorHandler={selectTechnicalIndicatorHandler}
          ti_timeintervals={ti_timeintervals}
          intervalComponentState={intervalComponentState}
          selectIntervalHandler={selectIntervalHandler}
          selectIntervalHandlerTI={selectIntervalHandlerTI}
          selectTimeSeriesHandler={selectTimeSeriesHandler}
          companyNews={companyNews}
          setGroupedGraphData={setGroupedGraphData}
          slider1valueGroup={slider1valueGroup}
          setSlider1valueGroup={setSlider1valueGroup}
          slider2valueGroup={slider2valueGroup}
          setSlider2valueGroup={setSlider2valueGroup}
        />
      ),
      // errorElement: <ErrorPage />,

      children: [
        {
          path: "",
          element: (
            <Home
              toggleOHLCandVolume={toggleOHLCandVolume}
              graphData={graphData}
              companySymbol={companySymbol}
              volumeData={volumeData}
              ti_graphData={ti_graphData}
              technicalIndicator={technicalIndicator}
              timeseriestoview={timeseriestoview}
            />
          ),
        },
        {
          path: "/comparestocks",
          element: <CompareStocks graphData={groupedgraphData} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
