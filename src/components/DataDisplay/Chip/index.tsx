import type { HTMLAttributes } from "react";
import "./Chip.css";

export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  onRemove?: () => void;
};

export default function Chip({ className, children, onRemove, ...props }: ChipProps) {
  const classes = ["vx-chip", className ?? ""].filter(Boolean).join(" ");
  return (
    <span className={classes} {...props}>
      <span>{children}</span>
      {onRemove ? (
        <button type="button" className="vx-chip__close" onClick={onRemove} aria-label="Quitar">
          ×
        </button>
      ) : null}
    </span>
  );
}
