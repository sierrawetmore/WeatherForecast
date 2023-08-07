import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "./Search";

test("renders", async () => {
  render(<Search setData={() => {}} setShortAddress={() => {}} />);

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

test("success", async () => {
  render(<Search setData={() => {}} setShortAddress={() => {}} />);

  const testAddress = "2551 VISTA DR JUNEAU AK 99801";

  const input = screen.getByPlaceholderText(
    "Enter an address to see the 7-day forecast"
  );

  fireEvent.change(input, { target: { value: testAddress } });
  const button = await screen.findByRole("button", { name: "Search" });
  fireEvent.click(button);

  const error = screen.queryByTestId("search-element__error");

  await waitFor(() => {
    expect(error).toBeFalsy();
  });
});
