import type { HTMLAttributes } from "react";
import "./Divider.css";

export type DividerProps = HTMLAttributes<HTMLHRElement>;

export default function Divider({ className, ...props }: DividerProps) {
  const classes = ["vx-divider", className ?? ""].filter(Boolean).join(" ");
  return <hr className={classes} {...props} />;
}
