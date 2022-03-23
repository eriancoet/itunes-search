import { render, screen } from "@testing-library/react";
import SearchBox from "../Components/SearchBox";

test("renders Button", () => {
  render(<SearchBox />);
  const button = screen.getByText("Search");
  expect(button).toBeInTheDocument();
});