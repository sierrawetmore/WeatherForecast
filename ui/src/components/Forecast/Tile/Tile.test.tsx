import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tile from "./Tile";
import { GridpointForecastPeriod } from "../../../types/weatherTypes";

const dummyDay: GridpointForecastPeriod = {
  number: 1,
  name: "Friday",
  startTime: "start",
  endTime: "end",
  isDaytime: true,
  temperature: null,
  temperatureUnit: "F",
  temperatureTrend: null,
  probabilityOfPrecipitation: null,
  dewpoint: null,
  relativeHumidity: null,
  windSpeed: null,
  windGust: null,
  windDirection: null,
  shortForecast: "sunny with a chance of meatballs",
  detailedForecast: "the sun will shine and meatballs will also be there",
};

test("tile loads and displays forecast", async () => {
  // ARRANGE
  render(<Tile day={dummyDay} />);

  // ASSERT
  const fridays = screen.getAllByText(/friday/i);
  // front and back
  expect(fridays).toHaveLength(2);
  expect(screen.getByTestId("tile-front")).toHaveTextContent(
    "chance of meatballs"
  );
  expect(screen.getByTestId("tile-flipped")).toHaveTextContent(
    "meatballs will also be there"
  );
});
