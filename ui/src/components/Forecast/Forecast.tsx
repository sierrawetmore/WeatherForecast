import React, { useCallback, useEffect, useState } from "react";
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
      {!data ? null : (
        <div>
          <span>{`Results for ${address}`}</span>
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
