import type { HTMLAttributes } from "react";
import "./Box.css";

export type BoxProps = HTMLAttributes<HTMLDivElement>;

export default function Box({ className, children, ...props }: BoxProps) {
  const classes = ["vx-box", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
