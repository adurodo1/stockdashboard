const TimeSeriesSelecter = ({ selectTimeSeriesHandler }) => {
  return (
    <>
      <select onChange={(e) => selectTimeSeriesHandler(e.target.value)}>
        <option value="">Time Series</option>
        <option value="TIME_SERIES_INTRADAY">Intraday</option>
        <option value="TIME_SERIES_DAILY">Daily</option>
        <option value="TIME_SERIES_DAILY_ADJUSTED">Daily Adjusted</option>
        <option value="TIME_SERIES_WEEKLY">Weekly</option>
        <option value="TIME_SERIES_WEEKLY_ADJUSTED">Weekly Adjusted</option>

        <option value="TIME_SERIES_MONTHLY">Monthly</option>
        <option value="TIME_SERIES_MONTHLY_ADJUSTED">Monthly Adjusted</option>
      </select>
    </>
  );
};

export default TimeSeriesSelecter;
