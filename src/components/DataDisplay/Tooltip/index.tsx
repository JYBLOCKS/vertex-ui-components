import { useState, type HTMLAttributes, type ReactNode } from "react";
import "./Tooltip.css";

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & {
  content: ReactNode;
};

export default function Tooltip({ content, children, className, ...props }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const classes = ["vx-tooltip", className ?? ""].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
      {open ? <span className="vx-tooltip__bubble">{content}</span> : null}
    </span>
  );
}
