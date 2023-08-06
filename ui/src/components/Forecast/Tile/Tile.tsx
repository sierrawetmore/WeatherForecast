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
        <div className="forecast-tile__front" data-testid="tile-front">
          <h4>{day.name}</h4>
          <Icon info={day.shortForecast} />
          <p>{day.shortForecast}</p>
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
          data-testid="tile-flipped"
          onClick={() => {
            console.log("clicked");
            // flip
            // could add className when "locked in" and handle transform in css file
          }}
        >
          <h4>{day.name}</h4>
          <span> {day.detailedForecast}</span>
          <span>
            <AirIcon sx={{ fontSize: 20 }} /> {day.windSpeed}{" "}
            {day.windDirection}
          </span>
          <span>
            <OpacityIcon sx={{ fontSize: 20, color: "lightblue" }} />
            {day.relativeHumidity.value ?? 0}
            {"% humidity  "}
          </span>

          <p className="forecast-tile__front--footer">Click the card to pin</p>
        </div>
      </div>
    );
  else return <></>;
};
export default Tile;
