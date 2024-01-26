import { useEffect, useMemo, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Searchbox from "./Components/Searchbox";
import {
  searchCompanyNews,
  searchTehnicalIndicators,
  searchTimeSeries,
  synthesizeGeneralData,
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

const HomeWidget = ({
  searchBoxProps,
  slider1value,
  setSlider1value,
  slider2value,
  setSlider2value,
  timeintervals,
  selectTechnicalIndicatorHandler,
  ti_timeintervals,
  intervalComponentState,
  selectIntervalHandler,
  selectIntervalHandlerTI,
  selectTimeSeriesHandler,
  companyNews,
}) => {
  function selectCompanySymbol(e, ref, styles) {
    //e.preventDefault();

    searchBoxProps.setCompanySymbol(() => e.target.title);
    ref.current.className = styles.searchresult;
  }
  return (
    <>
      <div className="left">
        <div className="dashboard_input">
          <details open>
            <summary>
              OHLC Dashboard{" "}
              <span>
                <i class="fa-solid fa-caret-down"></i>
              </span>
            </summary>
            <table>
              <tbody>
                <tr>
                  <td className="title">Search</td>
                </tr>
                <tr>
                  <td>
                    <Searchbox
                      symbolapi={searchBoxProps}
                      selectCompanySymbol={selectCompanySymbol}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">Year in Between</td>
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
                  <td className="title">Time Series</td>
                </tr>
                <tr>
                  <td>
                    <>
                      <TimeSeriesSelecter
                        selectTimeSeriesHandler={selectTimeSeriesHandler}
                      />
                    </>
                  </td>
                </tr>
                <tr>
                  <td className="title">Interval</td>
                </tr>
                <tr>
                  <td>
                    <>
                      {intervalComponentState ? (
                        <IntervalSelecter
                          timeintervals={timeintervals}
                          selectIntervalHandler={selectIntervalHandler}
                          defaultValue={"30min"}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  </td>
                </tr>
                <tr>
                  <td>Place Component Here</td>
                </tr>
              </tbody>
            </table>
          </details>
        </div>
        <div className="dashboard_input">
          <details open>
            <summary>
              Technical Indicator Dashboard{" "}
              <span>
                <i class="fa-solid fa-caret-down"></i>
              </span>
            </summary>
            <table>
              <tbody>
                <tr>
                  <td className="title">Technical Index</td>
                </tr>
                <tr>
                  <td>
                    <>
                      <TechnicalIndicatorSelector
                        selectTechnicalIndicatorHandler={
                          selectTechnicalIndicatorHandler
                        }
                      />
                    </>
                  </td>
                </tr>
                <tr>
                  <td className="title">Technical Index Interval</td>
                </tr>
                <tr>
                  <td>
                    <>
                      <IntervalSelecter
                        timeintervals={ti_timeintervals}
                        selectIntervalHandler={selectIntervalHandlerTI}
                        defaultValue={"weekly"}
                      />
                    </>
                  </td>
                </tr>
                <tr>
                  <td>Place Component Here</td>
                </tr>
              </tbody>
            </table>
          </details>
        </div>
        <div className="news">
          <details>
            <summary>
              News{" "}
              <span>
                <i class="fa-solid fa-caret-down"></i>
              </span>
            </summary>
            {companyNews ? <News newsdata={companyNews} /> : ""}
          </details>
        </div>
      </div>
    </>
  );
};

const CompareCompanyWidget = ({
  searchBoxPropsforGroups,
  setGroupedGraphData,
  slider1value,
  setSlider1value,
  slider2value,
  setSlider2value,
  timeintervals,
  selectTechnicalIndicatorHandler,
  ti_timeintervals,
  intervalComponentState,
  selectIntervalHandler,
  selectTimeSeriesHandler,
  companyNews,
  slider1valueGroup,
  setSlider1valueGroup,
  slider2valueGroup,
  setSlider2valueGroup,
}) => {
  const [groupedresults, setGroupedResults] = useState();
  function selectCompanySymbol(e, ref, styles) {
    //e.preventDefault();

    searchBoxPropsforGroups.setGroupCompanySymbol((prev) => [
      ...prev,
      e.target.title,
    ]);
    ref.current.className = styles.searchresult;
  }

  async function searchBtnHandler() {
    //searchTimeSeries(company, timeseries, interval = "5min")
    let results = [];

    for (
      let index = 0;
      index < searchBoxPropsforGroups.groupCompanySymbol.length;
      index++
    ) {
      const element = searchBoxPropsforGroups.groupCompanySymbol[index];
      let temp = await searchTimeSeries(element, "TIME_SERIES_MONTHLY");
      temp.companyname = element;

      results.push(temp);
    }
    setGroupedResults(results);
    let groupedSeries = [];
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      let resolveSynthesized = await synthesizeGeneralData(
        element,
        slider1valueGroup,
        slider2valueGroup
      );

      groupedSeries.push(resolveSynthesized[0]);
    }
    // console.log(groupedSeries);
    let highestordered = groupedSeries.sort(
      (a, b) => b.labeldata.length - a.labeldata.length
    );
    // console.log(highestordered);
    let newObj = {
      labeldata: highestordered[0].labeldata,
      data: highestordered,
    };

    //console.log(newObj);
    setGroupedGraphData(newObj);
    //if(groupedSeries[])

    // console.log([... await results]);
  }

  useEffect(() => {
    async function main() {
      let groupedSeries = [];
      for (let index = 0; index < groupedresults.length; index++) {
        const element = groupedresults[index];
        let resolveSynthesized = await synthesizeGeneralData(
          element,
          slider1valueGroup,
          slider2valueGroup
        );

        groupedSeries.push(resolveSynthesized[0]);
      }
      // console.log(groupedSeries);
      let highestordered = groupedSeries.sort(
        (a, b) => b.labeldata.length - a.labeldata.length
      );
      // console.log(highestordered);
      let newObj = {
        labeldata: highestordered[0].labeldata,
        data: highestordered,
      };

      //console.log(newObj);
      setGroupedGraphData(newObj);
    }
    main();
  }, [slider1valueGroup, slider2valueGroup]);

  return (
    <>
      <div className="left">
        <div className="dashboard_input">
          <details open>
            <summary>
              OHLC Dashboard{" "}
              <span>
                <i class="fa-solid fa-caret-down"></i>
              </span>
            </summary>
            <table>
              <tbody>
                <tr>
                  <td className="title">Search</td>
                </tr>
                <tr>
                  <td>
                    <Searchbox
                      symbolapi={searchBoxPropsforGroups}
                      selectCompanySymbol={selectCompanySymbol}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">Year in Between</td>
                </tr>
                <tr>
                  <td>
                    <TimeSlider
                      slider1={{
                        slider1value: slider1valueGroup,
                        setSlider1value: setSlider1valueGroup,
                      }}
                      slider2={{
                        slider2value: slider2valueGroup,
                        setSlider2value: setSlider2valueGroup,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">Selected Companies</td>
                </tr>

                <tr>
                  <td>
                    <ul>
                      {searchBoxPropsforGroups.groupCompanySymbol
                        ? searchBoxPropsforGroups.groupCompanySymbol.map(
                            (item, key) => {
                              return <li key={key}>{item}</li>;
                            }
                          )
                        : ""}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button onClick={searchBtnHandler}>search</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </details>
        </div>
      </div>
    </>
  );
};
const Layout = ({
  searchBoxProps,
  searchBoxPropsforGroups,
  slider1value,
  setSlider1value,
  slider2value,
  setSlider2value,
  timeintervals,
  selectTechnicalIndicatorHandler,
  ti_timeintervals,
  intervalComponentState,
  selectIntervalHandler,
  selectIntervalHandlerTI,
  selectTimeSeriesHandler,
  companyNews,
  setGroupedGraphData,
  slider1valueGroup,
  setSlider1valueGroup,
  slider2valueGroup,
  setSlider2valueGroup,
}) => {
  const link = useLocation();
  const path = link.pathname;

  function selectAppWidgetToRender(path) {
    switch (path) {
      case "/":
        return (
          <HomeWidget
            searchBoxProps={searchBoxProps}
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
          />
        );

      case "/comparestocks":
        return (
          <CompareCompanyWidget
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
            selectTimeSeriesHandler={selectTimeSeriesHandler}
            companyNews={companyNews}
            setGroupedGraphData={setGroupedGraphData}
            slider1valueGroup={slider1valueGroup}
            setSlider1valueGroup={setSlider1valueGroup}
            slider2valueGroup={slider2valueGroup}
            setSlider2valueGroup={setSlider2valueGroup}
          />
        );
    }
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <Link to={"/"}>
            {" "}
            <span>Home</span>
          </Link>
          <Link to={"/comparestocks"}>
            {" "}
            <span>Compare stocks</span>
          </Link>
        </div>
        <div className="upper">
          {selectAppWidgetToRender(path)}
          <Outlet />
        </div>

        <div className="bottom">
          <div className="maps"></div>
        </div>
      </div>
    </>
  );
};

export default Layout;
