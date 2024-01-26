import { useEffect, useMemo, useState } from "react";
import TechnicalIndicatorSelector from "./Components/TechnicalIndicatorSelector";
import {
  searchTehnicalIndicators,
  synthesizeTechnicalData,
} from "./utilities/alphavantageHelpers";
import TILineChart from "./Components/TILineChart";
//import "./App.css";
import Searchbox from "./Components/Searchbox";
import IntervalSelecter from "./Components/IntervalSelecter";
import "./App.css";

const TechnicalIndex = () => {
  const [companyData, setCompanyData] = useState();
  const [companySymbol, setCompanySymbol] = useState("AAPL");
  const [technicalIndicator, setTechnicalIndicator] = useState("OBV");
  const [graphData, setGraphData] = useState();
  const [interval, setInterval] = useState("weekly");

  const timeintervals = [
    "1min",
    "5min",
    "30min",
    "60min",
    "daily",
    "weekly",
    "monthly",
  ];

  const searchBoxProps = useMemo(() => {
    return { companySymbol, setCompanySymbol };
  }, [companySymbol, setCompanySymbol]);

  async function selectTechnicalIndicatorHandler(ti) {
    //get data
    //call appropriate url
    if (ti === "") return;
    console.log(ti);
    setTechnicalIndicator(ti);
    const results = await searchTehnicalIndicators(companySymbol, ti, interval);
    setCompanyData(results);
  }

  async function selectIntervalHandler(inv) {
    //get data
    //call appropriate url
    if (inv === "") return;
    setInterval(() => inv);
    console.log(interval);
    const results = await searchTehnicalIndicators(
      companySymbol,
      technicalIndicator,
      inv
    );
    setCompanyData(results);
  }

  useEffect(() => {
    async function main() {
      if (companySymbol === "") return;

      const results = await searchTehnicalIndicators(
        companySymbol,
        technicalIndicator,
        interval
      );
      setCompanyData(results);
    }

    main();
  }, [companySymbol]);
  useEffect(() => {
    async function main() {
      if (companyData === undefined) return;
      let results = await synthesizeTechnicalData(companyData);
      setGraphData(() => results);
    }
    main();
  }, [companyData]);

  return (
    <div style={{ display: "inline" }}>
      <h1>T.I</h1>
      <br></br>

      <Searchbox symbolapi={searchBoxProps} />
      <br></br>
      <TechnicalIndicatorSelector
        selectTechnicalIndicatorHandler={selectTechnicalIndicatorHandler}
      />

      <IntervalSelecter
        timeintervals={timeintervals}
        selectIntervalHandler={selectIntervalHandler}
        defaultValue={"weekly"}
      />

      <div className="right">
        <div className="line_graph">
          {graphData ? (
            <TILineChart
              generalData={graphData}
              company={companySymbol + " " + technicalIndicator}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndex;
