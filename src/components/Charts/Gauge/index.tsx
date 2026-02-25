import type { HTMLAttributes } from "react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import "../Bars/Bars.css";

export type GaugeProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  value?: number;
  min?: number;
  max?: number;
};

const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  (
    { title = "Gauge", value = 50, min = 0, max = 100, className, ...props },
    ref
  ) => {
    const clamped = Math.min(Math.max(value, min), max);
    const percent = ((clamped - min) / Math.max(max - min, 1)) * 100;
    const [animatedPercent, setAnimatedPercent] = useState(percent);
    const [animatedValue, setAnimatedValue] = useState(clamped);
    const percentRef = useRef(percent);
    const valueRef = useRef(clamped);
    const radius = 46;
    const cx = 60;
    const cy = 66;
    const classes = ["vx-chart", className ?? ""].filter(Boolean).join(" ");

    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const duration = 420;
      const fromPercent = percentRef.current;
      const fromValue = valueRef.current;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        setAnimatedPercent(fromPercent + (percent - fromPercent) * eased);
        setAnimatedValue(fromValue + (clamped - fromValue) * eased);

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        }

        if (t >= 1) {
          percentRef.current = percent;
          valueRef.current = clamped;
        }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [clamped, percent]);

    const gaugePath = useMemo(
      () =>
        `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${
          cx + radius
        } ${cy}`,
      [cx, cy, radius]
    );

    const needle = useMemo(() => {
      const angle = Math.PI * (1 - animatedPercent / 100);
      const x = cx + Math.cos(angle) * (radius - 6);
      const y = cy - Math.sin(angle) * (radius - 6);
      return { x, y };
    }, [animatedPercent, cx, cy, radius]);

    return (
      <div ref={ref} className={classes} {...props}>
        <header className="vx-chart__header">{title}</header>
        <div className="vx-chart__canvas">
          <svg
            className="vx-chart__svg"
            role="img"
            aria-label={`Indicador ${title}`}
            viewBox="0 0 120 80"
            preserveAspectRatio="xMinYMin meet"
          >
            <path d={gaugePath} className="vx-chart__gauge-track" />
            <path
              d={gaugePath}
              className="vx-chart__gauge-fill"
              pathLength={100}
              strokeDasharray={`${animatedPercent} 100`}
            />
            <line
              x1={cx}
              y1={cy}
              x2={needle.x}
              y2={needle.y}
              className="vx-chart__gauge-needle"
            />
            <circle cx={cx} cy={cy} r={2} fill="var(--vx-text, #0f172a)" />
            <text
              x={cx}
              y={cy - 12}
              textAnchor="middle"
              className="vx-chart__svg-label"
            >
              {animatedPercent.toFixed(0)}%
            </text>
            <text
              x={cx}
              y={cy + 8}
              textAnchor="middle"
              className="vx-chart__svg-label"
            >
              {animatedValue.toFixed(0)} / {max}
            </text>
          </svg>
        </div>
      </div>
    );
  }
);

Gauge.displayName = "Gauge";

export default Gauge;
