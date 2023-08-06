import React, { useEffect, useState, useRef, useCallback } from "react";
import { debounce } from "lodash";
import Forecast from "./components/Forecast/Forecast";
import Search from "./components/Search/Search";
import { GridpointForecastPeriod } from "./types/weatherTypes";
import "./App.css";

function App() {
  // TODO standardize class names
  // TODO a11y
  // TODO testing
  // TODO add loading states
  // TODO clean up any types
  const [data, setData] = useState<GridpointForecastPeriod[] | null>(null);
  const [shortAddress, setShortAddress] = useState<string>("");
  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <Search setData={setData} setShortAddress={setShortAddress} />
      <Forecast data={data} address={shortAddress} />
    </div>
  );
}

export default App;
