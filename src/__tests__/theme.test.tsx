import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider, ThemeSwitcher } from "../components/Styles";

describe("Theme components", () => {
  it("renders ThemeSwitcher within provider", () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );
    expect(screen.getByLabelText(/Tema/i)).toBeInTheDocument();
  });
});
