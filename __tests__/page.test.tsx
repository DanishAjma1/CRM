import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import "@testing-library/jest-dom";

describe("Landing Page", () => {
  it("renders hero heading", () => {
    render(<Page />);

    expect(
      screen.getByText(/Elevate Your Business/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Digital Excellence/i),
    ).toBeInTheDocument();
  });
});
