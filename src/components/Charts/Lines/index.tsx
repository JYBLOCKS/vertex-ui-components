import type { HTMLAttributes } from "react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import "../Bars/Bars.css";

export type LinesProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  series?: Array<{ name: string; points: Array<number> }>;
};

const Lines = forwardRef<HTMLDivElement, LinesProps>(
  ({ title = "Lines", series = [], className, ...props }, ref) => {
    const [hidden, setHidden] = useState<Set<string>>(new Set());
    const filteredSeries = useMemo(
      () => series.filter((line) => !hidden.has(line.name)),
      [hidden, series]
    );
    const [animatedSeries, setAnimatedSeries] = useState(filteredSeries);
    const previousRef = useRef(filteredSeries);
    const width = 120;
    const height = 70;
    const padding = 12;
    const palette = ["#2563eb", "#22c55e", "#f97316", "#a855f7", "#0ea5e9"];

    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const duration = 420;
      const previous = previousRef.current;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        setAnimatedSeries(
          filteredSeries.map((serie) => {
            const prev = previous.find((item) => item.name === serie.name);
            const prevPoints =
              prev?.points ?? new Array(serie.points.length).fill(0);
            const points = serie.points.map((point, index) => {
              const from =
                prevPoints[index] ?? prevPoints[prevPoints.length - 1] ?? 0;
              return from + (point - from) * eased;
            });

            return { ...serie, points };
          })
        );

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          previousRef.current = filteredSeries;
        }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [filteredSeries]);

    const classes = ["vx-chart", className ?? ""].filter(Boolean).join(" ");
    const maxY = useMemo(() => {
      const values = filteredSeries.flatMap((line) => line.points);
      return values.length ? Math.max(...values, 1) : 1;
    }, [filteredSeries]);
    const maxPoints = useMemo(
      () =>
        Math.max(
          ...filteredSeries.map((line) => Math.max(line.points.length - 1, 1)),
          1
        ),
      [filteredSeries]
    );

    const gridLines = useMemo(() => {
      const vertical = Array.from({ length: maxPoints + 1 }, (_, index) => {
        const x = padding + (index / maxPoints) * (width - padding * 2);
        return {
          key: `v-${index}`,
          x1: x,
          x2: x,
          y1: padding / 2,
          y2: height - padding / 2,
        };
      });
      const horizontal = [0.25, 0.5, 0.75, 1].map((fraction) => {
        const y = height - padding - fraction * (height - padding * 2);
        return {
          key: `h-${fraction}`,
          x1: padding,
          x2: width - padding,
          y1: y,
          y2: y,
        };
      });
      return [...vertical, ...horizontal];
    }, [height, maxPoints, padding, width]);

    const computePoints = (values: number[]) => {
      const length = Math.max(values.length - 1, 1);
      return values.map((value, index) => {
        const x = padding + (index / length) * (width - padding * 2);
        const y =
          height -
          padding -
          (value / Math.max(maxY, 1)) * (height - padding * 2);
        return { x, y };
      });
    };

    return (
      <div ref={ref} className={classes} {...props}>
        <header className="vx-chart__header">{title}</header>
        {series.length > 0 ? (
          <div className="vx-chart__legend vx-chart__legend--interactive">
            {series.map((line, index) => {
              const off = hidden.has(line.name);
              return (
                <button
                  key={line.name}
                  type="button"
                  className={`vx-chart__legend-item vx-chart__filter ${
                    off ? "is-off" : ""
                  }`}
                  onClick={() =>
                    setHidden((prev) => {
                      const next = new Set(prev);
                      if (next.has(line.name)) {
                        next.delete(line.name);
                      } else {
                        next.add(line.name);
                      }
                      return next;
                    })
                  }
                >
                  <span
                    className="vx-chart__legend-swatch"
                    style={{ backgroundColor: palette[index % palette.length] }}
                  />
                  <span className="vx-chart__label">{line.name}</span>
                </button>
              );
            })}
          </div>
        ) : null}
        {series.length === 0 ? (
          <p className="vx-chart__empty">Sin datos</p>
        ) : filteredSeries.length === 0 ? (
          <p className="vx-chart__empty">Activa al menos una serie</p>
        ) : (
          <div className="vx-chart__canvas">
            <svg
              className="vx-chart__svg"
              role="img"
              aria-label={`Grafico de lineas ${title}`}
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMinYMin meet"
            >
              <g className="vx-chart__grid">
                {gridLines.map((line) => (
                  <line
                    key={line.key}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke=""
                  />
                ))}
              </g>
              {animatedSeries.map((line, lineIndex) => {
                const color = palette[lineIndex % palette.length];
                const points = computePoints(line.points);
                const path = points
                  .map(
                    (point, index) =>
                      `${index === 0 ? "M" : "L"}${point.x},${point.y}`
                  )
                  .join(" ");

                return (
                  <g key={line.name}>
                    <path
                      d={path}
                      fill="none"
                      stroke={color}
                      strokeWidth={2}
                      className="vx-chart__line"
                    />
                    {points.map((point, index) => (
                      <circle
                        key={`${line.name}-${index}`}
                        cx={point.x}
                        cy={point.y}
                        r={1.8}
                        fill={color}
                        className="vx-chart__point"
                      />
                    ))}
                  </g>
                );
              })}
            </svg>
            <div className="vx-chart__legend">
              {animatedSeries.map((line, index) => (
                <div key={line.name} className="vx-chart__legend-item">
                  <span
                    className="vx-chart__legend-swatch"
                    style={{ backgroundColor: palette[index % palette.length] }}
                  />
                  <span className="vx-chart__label">{line.name}</span>
                  <span className="vx-chart__value">
                    {Math.round(line.points[line.points.length - 1] ?? 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Lines.displayName = "Lines";

export default Lines;
