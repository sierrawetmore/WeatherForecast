import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import Icon from "../Icon/Icon";
import { GridpointForecastPeriod } from "../../../types/weatherTypes";
import "./Tile.css";

type TileProps = {
  day: GridpointForecastPeriod;
};

const Tile = ({ day }: TileProps) => {
  if (day.isDaytime)
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
          {/* <div> */}
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
          {/* </div> */}
        </div>
        <div
          className="forecast-tile__flipped"
          data-testid={"tile-flipped-" + day.name}
        >
          <h4>{day.name}</h4>
          <span> {day.detailedForecast}</span>
          <span>
            <AirIcon sx={{ fontSize: 20 }} /> {day.windSpeed}{" "}
            {day.windDirection}
          </span>
          <span>
            <OpacityIcon sx={{ fontSize: 20, color: "lightblue" }} />
            {day.relativeHumidity?.value ?? 0}
            {"% humidity  "}
          </span>
        </div>
      </div>
    );
  else return <></>;
};
export default Tile;
