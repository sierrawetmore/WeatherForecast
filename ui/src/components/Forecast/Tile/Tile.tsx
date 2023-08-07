import { useState, useEffect } from "react";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import NorthIcon from "@mui/icons-material/North";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import SouthIcon from "@mui/icons-material/South";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

import Icon from "../Icon/Icon";
import { GridpointForecastPeriod } from "../../../types/weatherTypes";
import "./Tile.css";

type TileProps = {
  day: GridpointForecastPeriod;
};

const Tile = ({ day }: TileProps) => {
  const [arrowIcon, setArrowIcon] = useState(
    <WaterDropIcon sx={{ fontSize: 20, color: "lightblue" }} />
  );

  useEffect(() => {
    switch (day.windDirection) {
      case "NE":
        setArrowIcon(<NorthEastIcon fontSize={"small"} />);
        break;
      case "NW":
        setArrowIcon(<NorthWestIcon fontSize={"small"} />);
        break;
      case "N":
        setArrowIcon(<NorthIcon fontSize={"small"} />);
        break;
      case "SE":
        setArrowIcon(<SouthEastIcon fontSize={"small"} />);
        break;
      case "SW":
        setArrowIcon(<SouthWestIcon fontSize={"small"} />);
        break;
      case "S":
        setArrowIcon(<SouthIcon fontSize={"small"} />);
        break;
      case "W":
        setArrowIcon(<WestIcon fontSize={"small"} />);
        break;
      case "E":
        setArrowIcon(<EastIcon fontSize={"small"} />);
        break;
    }
  }, []);

  if (day.isDaytime) {
    return (
      <div className="forecast-tile">
        <div
          className="forecast-tile__front"
          data-testid={"tile-front-" + day.name}
        >
          <div>
            <h4>{day.name}</h4>
            <Icon info={day.shortForecast} />
          </div>
          <div className="forecast-tile__front--tile-content">
            <p>{day.shortForecast}</p>
          </div>
          <div className="forecast-tile__front--footer">
            <span>{`${day.temperature}\u00B0${day.temperatureUnit}`}</span>
            <span>
              <WaterDropIcon sx={{ fontSize: 20, color: "lightblue" }} />{" "}
              {day.probabilityOfPrecipitation?.value ?? 0}%
            </span>
          </div>
        </div>
        <div
          className="forecast-tile__flipped"
          data-testid={"tile-flipped-" + day.name}
        >
          <h4>{day.name}</h4>
          <span> {day.detailedForecast}</span>
          <span>
            <AirIcon sx={{ fontSize: 20 }} />{" "}
            <span style={{ padding: "0 .25rem" }}>{`${day.windSpeed} `}</span>{" "}
            {arrowIcon}
          </span>
          <span>
            <OpacityIcon sx={{ fontSize: 20, color: "lightblue" }} />
            {day.relativeHumidity?.value ?? 0}
            {"% humidity  "}
          </span>
        </div>
      </div>
    );
  } else return <></>;
};
export default Tile;
