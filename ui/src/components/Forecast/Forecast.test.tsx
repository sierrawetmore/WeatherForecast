import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Forecast from "./Forecast";
import { TEST_FORECAST_DATA } from "./TestForecastData";
test("render", async () => {
  const testAddress = "Chicago, IL";

  render(<Forecast data={TEST_FORECAST_DATA} address={testAddress} />);

  const message = screen.queryByText("Forecast for Chicago, IL");
  const tile = screen.getByTestId("tile-front-Monday");

  const day = within(tile).getByText("Monday");
  const temp = within(tile).getByText("82");
  const forecast = within(tile).getByText(
    "Mostly Cloudy then Slight Chance Showers And Thunderstorms"
  );

  expect(message).toBeTruthy();
  expect(day).toBeTruthy();
  expect(temp).toBeTruthy();
  expect(forecast).toBeTruthy();
});
