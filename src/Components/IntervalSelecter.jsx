const IntervalSelecter = ({
  selectIntervalHandler,
  timeintervals,
  defaultValue,
}) => {
  //1min, 5min, 15min, 30min, 60min

  return (
    <>
      <select
        onChange={(e) => selectIntervalHandler(e.target.value)}
        defaultValue={defaultValue}
      >
        <option value="">pick interval</option>
        {timeintervals.map((opt, key) => {
          return (
            <option key={key} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default IntervalSelecter;
