import type { HTMLAttributes } from "react";
import "./Badge.css";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  color?: "gray" | "green" | "blue" | "amber" | "red";
};

export default function Badge({ color = "gray", className, children, ...props }: BadgeProps) {
  const classes = ["vx-badge", `vx-badge--${color}`, className ?? ""].filter(Boolean).join(" ");
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
