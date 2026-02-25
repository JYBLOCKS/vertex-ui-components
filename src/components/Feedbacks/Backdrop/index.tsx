import type { HTMLAttributes } from "react";
import "./Backdrop.css";

export type BackdropProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
};

export default function Backdrop({ open = false, className, ...props }: BackdropProps) {
  if (!open) return null;
  const classes = ["vx-backdrop", className ?? ""].filter(Boolean).join(" ");
  return <div className={classes} aria-hidden="true" {...props} />;
}
