import React from "react";
import "./Tile.css";
const Tile = ({ day }: any) => {
  // only show mornings
  // TODO detailed forcast has more info, single view mode?
  if (day.isDaytime)
    return (
      <div
        className="forecast-tile"
        style={{
          alignItems: "stretch",
          justifyContent: "center",
          justifyItems: "stretch",
        }}
      >
        <div>
          <h5>{day.name}</h5>
          <p>{day.shortForecast}</p>
          <p>
            {day.temperature}
            {day.temperatureUnit}
          </p>
          <img src={day.icon} />
          <p>chance of rain: {day.probabilityOfPrecipitation.value ?? 0}%</p>
        </div>
      </div>
    );
  else return <></>;
};
export default Tile;
