//https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo

export async function searchCompany(company) {
  let results = await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${
      import.meta.env.VITE_ALPHAV_API
    }`
  );

  let json = await results.json();
  //console.log(json);
  return json;
}

export async function searchCompanyNews(companySymbol) {
  console.log(companySymbol);
  let newsResults = await fetch(
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${companySymbol}&apikey=${
      import.meta.env.VITE_ALPHAV_API
    }`
  );

  let companyFunadamentals = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${companySymbol}&apikey=${
      import.meta.env.VITE_ALPHAV_API
    }`
  );

  let companyFunadamentalsjson = await companyFunadamentals.json();

  let newsjson = await newsResults.json();

  return [newsjson, companyFunadamentalsjson];
}

export async function searchMonthly(company) {
  let results = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${company}&apikey=${
      import.meta.env.VITE_ALPHAV_API
    }`
  );

  let json = await results.json();
  //["Monthly Time Series"] and ["Meta Data"]
  return json;
}

export async function synthesizeMonthlyData(json, slider1value, slider2value) {
  const slider1Date = new Date(slider1value + 1998, 12, 31, 23, 59, 59, 999); // Set day and month
  const slider2Date = new Date(slider2value + 1998, 12, 31, 23, 59, 59, 999); // Set day and month
  let prem_arr = [];
  let arr = [];

  for (const [key, value] of Object.entries(
    await json["Monthly Time Series"]
  )) {
    prem_arr.push({ key: key, value: value });
  }

  prem_arr.forEach((processedResult) => {
    let tempdate = new Date(processedResult.key);
    if (tempdate >= slider1Date && tempdate <= slider2Date)
      arr.push(processedResult);
  });

  let labels = [];
  let labelsRelatedData_open = [];
  let labelsRelatedData_high = [];
  let labelsRelatedData_low = [];
  let labelsRelatedData_close = [];
  let labelsRelatedData_volume = [];

  arr.map((data) => {
    labels.push(data.key);
    labelsRelatedData_open.push(Number(data.value["1. open"]));
    labelsRelatedData_high.push(Number(data.value["2. high"]));
    labelsRelatedData_low.push(Number(data.value["3. low"]));
    labelsRelatedData_close.push(Number(data.value["4. close"]));
    labelsRelatedData_volume.push(Number(data.value["5. volume"]));
  });
  let generalData = {
    labeldata: labels,
    open: labelsRelatedData_open,
    high: labelsRelatedData_high,
    low: labelsRelatedData_low,
    close: labelsRelatedData_close,
    volume: labelsRelatedData_volume,
  };

  let volumeData = {
    labeldata: labels,
    volume: labelsRelatedData_volume,
  };

  return [generalData, volumeData];
}
