import React, { useEffect, useState, useRef, useCallback } from "react";
import { debounce } from "lodash";
import Forecast from "./components/Forecast/Forecast";
import Search from "./components/Search/Search";
import { GridpointForecastPeriod } from "./types/weatherTypes";
import "./App.css";

function App() {
  // TODO standardize class names
  // TODO hitting enter should also submit
  // TODO a11y
  // TODO testing
  // TODO break into files
  // TODO add loading states
  // TODO clean up any types
  const [data, setData] = useState<GridpointForecastPeriod[] | null>(null);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);
  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <p>Enter an address to see the 7 day forecast</p>
      <Search setData={setData} />
      <Forecast data={data} address="put address here" />
    </div>
  );
}

export default App;
