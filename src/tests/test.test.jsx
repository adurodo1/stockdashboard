import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
it("Searh components appear", async () => {
  //Arrange
  render(<App />);
  //Act perform search, this is done by clicking the search input box
  const searchbox = screen.getByPlaceholderText("apple");

  await userEvent.click(screen.getByPlaceholderText("apple"));
  await userEvent.type(searchbox, "microsoft");
  await waitFor(async () => {
    expect(getByTestId("searchlistitems")).toBeInTheDocument();
  });

  expect(searchbox.getAttribute("placeholder")).toContain("microsoft");
  expect(screen.getByText("Loading")).toBeInTheDocument();
  // expect(screen.getByText("Search")).toBeInTheDocument();
});
