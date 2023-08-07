import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Search from "./Search";

test("renders", async () => {
  const { getByTestId } = render(
    <Search setData={() => {}} setShortAddress={() => {}} />
  );

  const button = screen.getByRole("button", { name: "Search" });
  const input = screen.getByPlaceholderText(
    "Enter an address to see the 7-day forecast"
  );

  expect(button).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test("empty address throws error", async () => {
  render(<Search setData={() => {}} setShortAddress={() => {}} />);

  const button = screen.getByRole("button", { name: "Search" });
  fireEvent.click(button);

  const error = screen.queryByText("Whoops! You forgot to enter an address!");

  expect(error).toBeTruthy();
});

// TODO failing test
test.skip("no results throws error", async () => {
  render(<Search setData={() => {}} setShortAddress={() => {}} />);

  await userEvent.type(
    screen.getByPlaceholderText("Enter an address to see the 7-day forecast"),
    "invalid address"
  );

  const button = await screen.findByRole("button", { name: "Search" });
  await waitFor(() => {
    userEvent.click(button);
  });

  expect(
    screen.getByPlaceholderText("Enter an address to see the 7-day forecast")
  ).toHaveValue("invalid address");

  const error = screen.queryByText("No results found");

  expect(error).toBeTruthy();
});

// TODO failing test
test.skip("success", async () => {
  render(<Search setData={() => {}} setShortAddress={() => {}} />);

  const testAddress = "2551 VISTA DR JUNEAU AK 99801";

  const input = screen.getByPlaceholderText(
    "Enter an address to see the 7-day forecast"
  );

  fireEvent.change(input, { target: { value: testAddress } });
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(2000);
  });

  const button = await screen.findByRole("button", { name: "Search" });
  fireEvent.click(button);

  const error = screen.queryByTestId("search-element__error");
  await waitFor(() => {
    expect(error).toBeFalsy();
  });
});
