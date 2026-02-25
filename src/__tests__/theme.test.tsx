import { render, screen } from "@testing-library/react";
import { ThemeProvider, ThemeSwitcher } from "../components/Styles";

describe("Theme components", () => {
  it("renders ThemeSwitcher within provider", () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );
    expect(screen.getByLabelText(/Tema/i)).toBeInTheDocument();
  });
});
