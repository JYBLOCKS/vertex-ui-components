import type { HTMLAttributes } from "react";
import "./Text.css";

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: "default" | "muted" | "danger" | "success";
  weight?: "normal" | "semibold" | "bold";
};

export default function Text({ tone = "default", weight = "normal", className, children, ...props }: TextProps) {
  const classes = ["vx-text", `vx-text--${tone}`, `vx-text--${weight}`, className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
}
