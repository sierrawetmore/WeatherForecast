import { useState } from "react";
import Forecast from "./components/Forecast/Forecast";
import Search from "./components/Search/Search";
import { GridpointForecastPeriod } from "./types/weatherTypes";
import "./App.css";

function App() {
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
