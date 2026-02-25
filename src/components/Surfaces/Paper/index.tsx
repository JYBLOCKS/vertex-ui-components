import type { HTMLAttributes } from "react";
import "./Paper.css";

export type PaperProps = HTMLAttributes<HTMLDivElement> & {
  elevation?: "sm" | "md" | "lg";
};

export default function Paper({ elevation = "md", className, children, ...props }: PaperProps) {
  const classes = ["vx-paper", `vx-paper--${elevation}`, className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
