import { forwardRef, useMemo } from "react";
import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import "./Rating.css";

export type RatingProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  icon?: ReactNode;
};

const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ value = 0, max = 5, readOnly = false, onChange, icon, className, ...props }, ref) => {
    const safeMax = Math.max(1, max);
    const items = useMemo(() => Array.from({ length: safeMax }, (_, i) => i + 1), [safeMax]);
    const classes = ["vx-rating", readOnly ? "vx-rating--readonly" : "", className ?? ""]
      .filter(Boolean)
      .join(" ");

    const handleClick = (v: number) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!readOnly) {
        onChange?.(v);
      }
    };

    return (
      <div ref={ref} className={classes} {...props}>
        {items.map((item) => (
          <button
            key={item}
            type="button"
            aria-label={`Rate ${item} of ${safeMax}`}
            className={item <= value ? "vx-rating__star is-active" : "vx-rating__star"}
            onClick={handleClick(item)}
            disabled={readOnly}
          >
            {icon ?? "★"}
          </button>
        ))}
      </div>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;
