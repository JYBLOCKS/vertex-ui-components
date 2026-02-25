import type { HTMLAttributes } from "react";
import "./Grid.css";

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: number;
  gap?: number;
  min?: string;
};

export default function Grid({ columns = 3, gap = 12, min, style, className, children, ...props }: GridProps) {
  const classes = ["vx-grid", className ?? ""].filter(Boolean).join(" ");
  const template = min ? `repeat(auto-fit, minmax(${min}, 1fr))` : `repeat(${columns}, minmax(0, 1fr))`;
  return (
    <div className={classes} style={{ gap: `${gap}px`, gridTemplateColumns: template, ...style }} {...props}>
      {children}
    </div>
  );
}
