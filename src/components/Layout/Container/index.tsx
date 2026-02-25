import type { HTMLAttributes } from "react";
import "./Container.css";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  maxWidth?: "sm" | "md" | "lg" | "xl";
};

export default function Container({ maxWidth = "lg", className, children, ...props }: ContainerProps) {
  const classes = ["vx-container", `vx-container--${maxWidth}`, className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
