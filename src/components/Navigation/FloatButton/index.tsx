import type { ButtonHTMLAttributes } from "react";
import "./FloatButton.css";

export type FloatButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function FloatButton({ className, children, ...props }: FloatButtonProps) {
  const classes = ["vx-float-btn", className ?? ""].filter(Boolean).join(" ");
  return (
    <button className={classes} type="button" {...props}>
      {children ?? "＋"}
    </button>
  );
}
