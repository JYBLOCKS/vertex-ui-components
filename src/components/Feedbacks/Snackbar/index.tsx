import { useEffect } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import "./Snackbar.css";

export type SnackbarPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type SnackbarProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  message: ReactNode;
  duration?: number;
  onClose?: () => void;
  placement?: SnackbarPlacement;
};

export default function Snackbar({
  open = false,
  message,
  duration = 3000,
  onClose,
  placement = "bottom-right",
  className,
  style,
  ...props
}: SnackbarProps) {
  useEffect(() => {
    if (!open || !duration) return;
    const id = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;
  const classes = ["vx-snackbar", `vx-snackbar--${placement}`, className ?? ""].filter(Boolean).join(" ");

  const anchorStyles: Record<SnackbarPlacement, CSSProperties> = {
    "top-left": { top: "1rem", left: "1rem", right: "auto", bottom: "auto" },
    "top-center": {
      top: "1rem",
      left: "50%",
      right: "auto",
      bottom: "auto",
      "--vx-snackbar-offset-x": "-50%",
    } as CSSProperties,
    "top-right": { top: "1rem", right: "1rem", left: "auto", bottom: "auto" },
    "bottom-left": { bottom: "1rem", left: "1rem", right: "auto", top: "auto" },
    "bottom-center": {
      bottom: "1rem",
      left: "50%",
      right: "auto",
      top: "auto",
      "--vx-snackbar-offset-x": "-50%",
    } as CSSProperties,
    "bottom-right": { bottom: "1rem", right: "1rem", left: "auto", top: "auto" },
  };

  return (
    <div className={classes} role="status" style={{ ...anchorStyles[placement], ...style }} {...props}>
      {message}
    </div>
  );
}
