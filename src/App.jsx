import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Searchbox from "./Components/Searchbox";
import {
  searchCompanyNews,
  searchMonthly,
  synthesizeMonthlyData,
} from "./utilities/alphavantageHelpers";
import TimeSlider from "./Components/TimeSlider";
import LineChart from "./Components/LineChart";
import BarChart from "./Components/BarChart";
import News from "./Components/News";

function App() {
  // console.log("App Rendered");
  const [companySymbol, setCompanySymbol] = useState("AAPL");
  const [companyData, setCompanyData] = useState();
  const [companyNews, setCompanyNews] = useState();
  const [slider1value, setSlider1value] = useState(0);
  const [slider2value, setSlider2value] = useState(25);
  const [graphData, setGraphData] = useState();
  const [volumeData, setVolumeData] = useState();

  const searchBoxProps = useMemo(() => {
    return { companySymbol, setCompanySymbol };
  }, [companySymbol, setCompanySymbol]);

  useEffect(() => {
    async function monthlySearch() {
      if (companySymbol === "") return;
      const results = await searchMonthly(companySymbol);
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
  return (
    <>
      <div className="container">
        <div className="upper">
          <div className="left">
            <div className="dashboard_input">
              <table>
                <tbody>
                  <tr>
                    <td>Search</td>
                  </tr>
                  <tr>
                    <td>
                      <Searchbox symbolapi={searchBoxProps} />
                    </td>
                  </tr>
                  <tr>
                    <td>Year in Between</td>
                  </tr>
                  <tr>
                    <td>
                      <TimeSlider
                        slider1={{
                          slider1value: slider1value,
                          setSlider1value: setSlider1value,
                        }}
                        slider2={{
                          slider2value: slider2value,
                          setSlider2value: setSlider2value,
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>OHLC</td>
                  </tr>
                  <tr>
                    <td>Place Component Here</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="news">
              {companyNews ? <News newsdata={companyNews} /> : ""}
            </div>
          </div>
          <div className="right">
            <div className="line_graph">
              {graphData ? (
                <LineChart generalData={graphData} company={companySymbol} />
              ) : (
                ""
              )}
            </div>
            <div className="barchart">
              {graphData ? (
                <BarChart volumeData={volumeData} company={companySymbol} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="maps"></div>
        </div>
      </div>
    </>
  );
}

export default App;
