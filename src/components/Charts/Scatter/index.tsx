import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import "../Bars/Bars.css";

export type ScatterPoint = { x: number; y: number; label?: string };
export type ScatterProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  points?: ScatterPoint[];
};

const Scatter = forwardRef<HTMLDivElement, ScatterProps>(
  ({ title = "Scatter", points = [], className, ...props }, ref) => {
    const [hidden, setHidden] = useState<Set<string>>(new Set());
    const filteredPoints = useMemo(
      () => points.filter((point, index) => !hidden.has(point.label ?? `P${index + 1}`)),
      [hidden, points]
    );
    const [animatedPoints, setAnimatedPoints] = useState(filteredPoints);
    const previousRef = useRef(filteredPoints);
    const width = 130;
    const height = 90;
    const padding = 14;
    const palette = ["#2563eb", "#22c55e", "#f97316", "#a855f7", "#0ea5e9", "#10b981"];

    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const duration = 420;
      const previous = previousRef.current;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        setAnimatedPoints(
          filteredPoints.map((point, index) => {
            const from = previous[index] ?? { x: 0, y: 0, label: point.label };
            return {
              ...point,
              x: from.x + (point.x - from.x) * eased,
              y: from.y + (point.y - from.y) * eased,
            };
          })
        );

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          previousRef.current = filteredPoints;
        }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [filteredPoints]);

    const classes = ["vx-chart", className ?? ""].filter(Boolean).join(" ");
    const maxX = useMemo(() => Math.max(...filteredPoints.map((point) => point.x), 1), [filteredPoints]);
    const maxY = useMemo(() => Math.max(...filteredPoints.map((point) => point.y), 1), [filteredPoints]);

    const project = (point: ScatterPoint) => ({
      x: padding + (point.x / Math.max(maxX, 1)) * (width - padding * 2),
      y: height - padding - (point.y / Math.max(maxY, 1)) * (height - padding * 2),
    });

    return (
      <div ref={ref} className={classes} {...props}>
        <header className="vx-chart__header">{title}</header>
        {points.length > 0 ? (
          <div className="vx-chart__filters">
            {points.map((point, index) => {
              const key = point.label ?? `P${index + 1}`;
              const off = hidden.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  className={`vx-chart__filter ${off ? "is-off" : ""}`}
                  onClick={() =>
                    setHidden((prev) => {
                      const next = new Set(prev);
                      if (next.has(key)) {
                        next.delete(key);
                      } else {
                        next.add(key);
                      }
                      return next;
                    })
                  }
                >
                  <span
                    className="vx-chart__legend-swatch"
                    style={{ backgroundColor: palette[index % palette.length] }}
                  />
                  <span className="vx-chart__label">{key}</span>
                </button>
              );
            })}
          </div>
        ) : null}
        {points.length === 0 ? (
          <p className="vx-chart__empty">Sin datos</p>
        ) : filteredPoints.length === 0 ? (
          <p className="vx-chart__empty">Activa al menos una serie</p>
        ) : (
          <div className="vx-chart__canvas">
            <svg
              className="vx-chart__svg"
              role="img"
              aria-label={`Grafico de dispersion ${title}`}
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMinYMin meet"
            >
              <g className="vx-chart__grid">
                {[0.25, 0.5, 0.75, 1].map((fraction) => {
                  const x = padding + fraction * (width - padding * 2);
                  const y = height - padding - fraction * (height - padding * 2);
                  return (
                    <g key={fraction}>
                      <line x1={x} x2={x} y1={padding} y2={height - padding} />
                      <line x1={padding} x2={width - padding} y1={y} y2={y} />
                    </g>
                  );
                })}
                <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} />
                <line x1={padding} x2={padding} y1={padding} y2={height - padding} />
              </g>
              {animatedPoints.map((point, index) => {
                const { x, y } = project(point);
                const color = palette[index % palette.length];
                return (
                  <g key={point.label ?? index}>
                    <circle cx={x} cy={y} r={2.5} className="vx-chart__point" fill={color} />
                    <text x={x + 4} y={y - 4} className="vx-chart__svg-label">
                      {point.label ?? `P${index + 1}`}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    );
  }
);

Scatter.displayName = "Scatter";

export default Scatter;
