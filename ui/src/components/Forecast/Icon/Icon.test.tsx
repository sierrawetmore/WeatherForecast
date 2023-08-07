import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon from "./Icon";

const testInfo = [
  "it is sunny with a chance of meatballs",
  "another day of thunderstorms",
  "snow is likely",
  "pack an umbrella, because it is going to rain",
  "no keywords here",
];

test("sun icon is chosen", async () => {
  const { getByTestId, queryByTestId } = render(<Icon info={testInfo[0]} />);

  expect(getByTestId("WbSunnyIcon")).toBeTruthy();
  expect(queryByTestId("ThunderstormIcon")).toBeFalsy();
});

test("thunder icon is chosen", async () => {
  const { getByTestId, queryByTestId } = render(<Icon info={testInfo[1]} />);

  expect(getByTestId("ThunderstormIcon")).toBeTruthy();
  expect(queryByTestId("WbSunnyIcon")).toBeFalsy();
});

test("snow icon is chosen", async () => {
  const { getByTestId, queryByTestId } = render(<Icon info={testInfo[2]} />);

  expect(getByTestId("SevereColdIcon")).toBeTruthy();
  expect(queryByTestId("WbSunnyIcon")).toBeFalsy();
});

test("rain icon is chosen", async () => {
  const { getByTestId, queryByTestId } = render(<Icon info={testInfo[3]} />);

  expect(getByTestId("WaterDropIcon")).toBeTruthy();
  expect(queryByTestId("WbSunnyIcon")).toBeFalsy();
});

test("default icon is chosen", async () => {
  const { getByTestId, queryByTestId } = render(<Icon info={testInfo[4]} />);

  expect(getByTestId("WbCloudyIcon")).toBeTruthy();
  expect(queryByTestId("WbSunnyIcon")).toBeFalsy();
});
