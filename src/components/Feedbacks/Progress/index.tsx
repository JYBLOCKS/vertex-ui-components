import { useMemo } from "react";
import type { HTMLAttributes } from "react";
import "./Progress.css";

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value?: number;
  max?: number;
  label?: string;
  indeterminate?: boolean;
};

export default function Progress({
  value,
  max = 100,
  label,
  indeterminate,
  className,
  ...props
}: ProgressProps) {
  const safeMax = Math.max(max, 1);
  const rawPercent = (value ?? 0) / safeMax;
  const percent = Math.min(100, Math.max(0, Math.round(rawPercent * 100)));
  const isComplete = percent >= 100 && !indeterminate;
  const isIndeterminate = indeterminate || value === undefined;
  const classes = ["vx-progress", isComplete ? "is-complete" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  const labelText = label ?? "Progreso";
  const ariaValueNow = useMemo(() => (isIndeterminate ? undefined : percent), [isIndeterminate, percent]);

  return (
    <div className={classes} role="group" aria-label={labelText} {...props}>
      <div className="vx-progress__meta">
        <span className="vx-progress__label">{labelText}</span>
        {!isIndeterminate ? <span className="vx-progress__value">{percent}%</span> : <span className="vx-progress__value">...</span>}
      </div>
      <div
        className={`vx-progress__track ${isIndeterminate ? "is-indeterminate" : ""}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaValueNow}
        aria-valuetext={isIndeterminate ? "Cargando" : `${percent}%`}
      >
        <div className="vx-progress__fill" style={{ width: isIndeterminate ? "30%" : `${percent}%` }}>
          <span className="vx-progress__shine" />
        </div>
      </div>
    </div>
  );
}
