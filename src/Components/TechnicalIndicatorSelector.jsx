const techniclIndicator = [
  {
    indicator: "OBV( on balance volume)",
    function: "OBV",
  },

  {
    indicator: "TRIMA(triangular moving average)",
    function: "TRIMA",
  },

  {
    indicator: "AD(Chaikin A/D)",
    function: "AD",
  },

  {
    indicator: "ADX(average directional movement index )",
    function: "ADX",
  },

  {
    indicator: "AROON(Aroon)",
    function: "AROON",
  },

  {
    indicator: "RSI(relative strength index  )",
    function: "RSI",
  },

  {
    indicator: "STOCH(stochastic oscillator  )",
    function: "STOCH",
  },
  {
    indicator: "SMA(simple moving average)",
    function: "SMA",
  },
  {
    indicator: "EMA(exponential moving average) ",
    function: "EMA",
  },
  {
    indicator: "WMA(weighted moving average)",
    function: "WMA",
  },
  {
    indicator: "DEMA( double exponential moving average)",
    function: "DEMA",
  },
  {
    indicator: "TEMA(triple exponential moving averagesimple moving average)",
    function: "TEMA",
  },
];

const TechnicalIndicatorSelector = ({ selectTechnicalIndicatorHandler }) => {
  return (
    <>
      <select
        onChange={(e) => selectTechnicalIndicatorHandler(e.target.value)}
        defaultValue={"OBV"}
      >
        <option value="">Technical Indicators</option>

        {techniclIndicator.map((item, key) => {
          return (
            <>
              {" "}
              <option value={item.function}>{item.indicator}</option>
            </>
          );
        })}
      </select>
    </>
  );
};

export default TechnicalIndicatorSelector;
