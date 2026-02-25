import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import "../Bars/Bars.css";

export type RadarProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  axes?: Array<{ label: string; value: number }>;
};

const Radar = forwardRef<HTMLDivElement, RadarProps>(
  ({ title = "Radar", axes = [], className, ...props }, ref) => {
    const [hidden, setHidden] = useState<Set<string>>(new Set());
    const filteredAxes = useMemo(
      () => axes.filter((axis) => !hidden.has(axis.label)),
      [axes, hidden]
    );
    const [animatedAxes, setAnimatedAxes] = useState(filteredAxes);
    const previousRef = useRef(filteredAxes);
    const radius = 52;
    const center = 70;
    const viewBox = 140;
    const rings = 4;
    const palette = ["#2563eb", "#22c55e", "#f97316", "#a855f7", "#0ea5e9", "#06b6d4"];

    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const duration = 420;
      const previous = previousRef.current;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        setAnimatedAxes(
          filteredAxes.map((axis) => {
            const from = previous.find((item) => item.label === axis.label)?.value ?? 0;
            return { ...axis, value: from + (axis.value - from) * eased };
          })
        );

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          previousRef.current = filteredAxes;
        }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [filteredAxes]);

    const classes = ["vx-chart", className ?? ""].filter(Boolean).join(" ");

    const points =
      animatedAxes.length === 0
        ? []
        : animatedAxes.map((axis, index) => {
            const angle = (index / animatedAxes.length) * Math.PI * 2 - Math.PI / 2;
            const distance = (Math.max(axis.value, 0) / 100) * radius;
            const x = center + Math.cos(angle) * distance;
            const y = center + Math.sin(angle) * distance;
            return { x, y, label: axis.label, value: axis.value, color: palette[index % palette.length] };
          });

    return (
      <div ref={ref} className={classes} {...props}>
        <header className="vx-chart__header">{title}</header>
        {axes.length > 0 ? (
          <div className="vx-chart__filters">
            {axes.map((axis, index) => {
              const off = hidden.has(axis.label);
              return (
                <button
                  key={axis.label}
                  type="button"
                  className={`vx-chart__filter ${off ? "is-off" : ""}`}
                  onClick={() =>
                    setHidden((prev) => {
                      const next = new Set(prev);
                      if (next.has(axis.label)) {
                        next.delete(axis.label);
                      } else {
                        next.add(axis.label);
                      }
                      return next;
                    })
                  }
                >
                  <span
                    className="vx-chart__legend-swatch"
                    style={{ backgroundColor: palette[index % palette.length] }}
                  />
                  <span className="vx-chart__label">{axis.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
        {axes.length === 0 ? (
          <p className="vx-chart__empty">Sin datos</p>
        ) : filteredAxes.length === 0 ? (
          <p className="vx-chart__empty">Activa al menos una serie</p>
        ) : (
          <div className="vx-chart__canvas">
            <svg
              className="vx-chart__svg"
              role="img"
              aria-label={`Grafico radar ${title}`}
              viewBox={`0 0 ${viewBox} ${viewBox}`}
            >
              <g className="vx-chart__grid">
                {Array.from({ length: rings }, (_, index) => {
                  const r = ((index + 1) / rings) * radius;
                  return <circle key={index} cx={center} cy={center} r={r} fill="none" />;
                })}
                {points.map((point, index) => {
                  const next = points[(index + 1) % points.length];
                  return (
                    <line
                      key={`${point.label}-axis`}
                      x1={center}
                      y1={center}
                      x2={next ? next.x : center}
                      y2={next ? next.y : center}
                    />
                  );
                })}
              </g>
              {points.length > 0 ? (
                <polygon
                  points={points.map((point) => `${point.x},${point.y}`).join(" ")}
                  className="vx-chart__radar"
                />
              ) : null}
              {points.map((point) => (
                <g key={point.label}>
                  <circle cx={point.x} cy={point.y} r={2.3} className="vx-chart__point" fill={point.color} />
                  <text
                    x={point.x}
                    y={point.y - 6}
                    className="vx-chart__svg-label"
                    textAnchor="middle"
                    fill={point.color}
                  >
                    {Math.round(point.value)}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        )}
      </div>
    );
  }
);

Radar.displayName = "Radar";

export default Radar;
