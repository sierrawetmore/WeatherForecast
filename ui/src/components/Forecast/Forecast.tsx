import Tile from "./Tile/Tile";
import { GridpointForecastPeriod } from "../../types/weatherTypes";
import "./Forecast.css";

type ForecastProps = {
  data: GridpointForecastPeriod[] | null;
  address: string;
};

const Forecast = ({ data, address }: ForecastProps) => {
  return (
    <div>
      {!data ? (
        <div className="tumbleweed-container">
          <p>
            Try searching an address in this format: 100 Shining Ave Town-in New
            York 12345
          </p>

          <div className="tumbleweed" />
        </div>
      ) : (
        <div>
          <h3>{`Forecast for ${address}`}</h3>
          <div className="tile-group">
            {data.map((d, index: number) => {
              return <Tile key={index} day={d} />;
            })}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Forecast;
