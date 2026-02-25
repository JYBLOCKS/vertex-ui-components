import type { HTMLAttributes } from "react";
import "./Flex.css";

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  gap?: number;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  direction?: "row" | "column";
  wrap?: boolean;
};

export default function Flex({
  gap = 8,
  align = "center",
  justify = "start",
  direction = "row",
  wrap = false,
  style,
  className,
  children,
  ...props
}: FlexProps) {
  const classes = [
    "vx-flex",
    `vx-flex--align-${align}`,
    `vx-flex--justify-${justify}`,
    direction === "column" ? "vx-flex--col" : "",
    wrap ? "vx-flex--wrap" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={{ gap: `${gap}px`, ...style }} {...props}>
      {children}
    </div>
  );
}
