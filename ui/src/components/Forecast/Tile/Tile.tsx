import React from "react";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

import Icon from "../Icon/Icon";
import { GridpointForecastPeriod } from "../../../types/weatherTypes";
import "./Tile.css";

type TileProps = {
  day: GridpointForecastPeriod;
};

const Tile = ({ day }: TileProps) => {
  // only show mornings
  // TODO detailed forcast has more info, single view mode?
  if (day.isDaytime)
    return (
      <div className="forecast-tile">
        <div className="forecast-tile__inner">
          <div className="forecast-tile__front" data-testid="tile-front">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <h4>{day.name}</h4>
              <Icon info={day.shortForecast} />
              <p>{day.shortForecast}</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span>
                  {day.temperature}
                  {" \u00B0 "}
                  {day.temperatureUnit}
                </span>
                <span>
                  <WaterDropIcon sx={{ fontSize: 20 }} />{" "}
                  {day.probabilityOfPrecipitation?.value ?? 0}%
                </span>
              </div>
              {/* 
              <p>
                {day.temperature}
                {day.temperatureUnit}
              </p>
              <p>
                <WaterDropIcon sx={{ fontSize: 20 }} />{" "}
                {day.probabilityOfPrecipitation?.value ?? 0}%
              </p> */}
            </div>
          </div>
          <div className="forecast-tile__flipped" data-testid="tile-flipped">
            <h4>{day.name}</h4>
            <span> {day.detailedForecast}</span>
            <p>Click to see more</p>
          </div>
        </div>
      </div>
    );
  else return <></>;
};
export default Tile;
