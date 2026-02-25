import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import "./Bars.css";

export type BarsProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  data?: Array<{ label: string; value: number; color?: string }>;
  footer?: ReactNode;
};

const Bars = forwardRef<HTMLDivElement, BarsProps>(
  ({ title = "Bars", data = [], footer, className, ...props }, ref) => {
    const [hidden, setHidden] = useState<Set<string>>(new Set());
    const displayData = useMemo(
      () =>
        data.map((item) => ({
          ...item,
          value: hidden.has(item.label) ? 0 : item.value,
          disabled: hidden.has(item.label),
        })),
      [data, hidden]
    );
    const [animatedData, setAnimatedData] = useState(displayData);
    const previousRef = useRef(displayData);
    const viewWidth = 120;
    const labelColumn = 38;
    const rowHeight = 18;
    const rowGap = 10;

    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const duration = 420;
      const previous = previousRef.current;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setAnimatedData(
          displayData.map((item) => {
            const from = previous.find((entry) => entry.label === item.label)?.value ?? 0;
            const value = from + (item.value - from) * eased;
            return { ...item, value };
          })
        );

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          previousRef.current = displayData;
        }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [displayData]);

    const maxValue = useMemo(
      () => Math.max(100, ...(displayData.map((item) => item.value) || []), 1),
      [displayData]
    );
    const height = animatedData.length * (rowHeight + rowGap) + rowGap;
    const classes = ["vx-chart", "vx-chart--bars", className ?? ""].filter(Boolean).join(" ");
    const activeCount = data.filter((item) => !hidden.has(item.label)).length;

    return (
      <div ref={ref} className={classes} {...props}>
        <header className="vx-chart__header">{title}</header>
        {data.length > 0 ? (
          <div className="vx-chart__filters">
            {data.map((item) => {
              const off = hidden.has(item.label);
              return (
                <button
                  type="button"
                  key={item.label}
                  className={`vx-chart__filter ${off ? "is-off" : ""}`}
                  onClick={() =>
                    setHidden((prev) => {
                      const next = new Set(prev);
                      if (next.has(item.label)) {
                        next.delete(item.label);
                      } else {
                        next.add(item.label);
                      }
                      return next;
                    })
                  }
                >
                  <span
                    className="vx-chart__legend-swatch"
                    style={{ backgroundColor: item.color ?? "#2563eb" }}
                  />
                  <span className="vx-chart__label">{item.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
        {data.length === 0 ? (
          <p className="vx-chart__empty">Sin datos</p>
        ) : activeCount === 0 ? (
          <p className="vx-chart__empty">Activa al menos una serie</p>
        ) : (
          <div className="vx-chart__canvas">
            <svg
              className="vx-chart__svg"
              role="img"
              aria-label={`Grafico de barras ${title}`}
              viewBox={`0 0 ${viewWidth} ${height}`}
              preserveAspectRatio="xMinYMin meet"
            >
              <g className="vx-chart__grid">
                {[0.25, 0.5, 0.75, 1].map((fraction) => (
                  <line
                    key={fraction}
                    x1={labelColumn + (viewWidth - labelColumn - 12) * fraction}
                    x2={labelColumn + (viewWidth - labelColumn - 12) * fraction}
                    y1={4}
                    y2={height - 4}
                  />
                ))}
              </g>
              {animatedData.map((item, index) => {
                const trackWidth = viewWidth - labelColumn - 16;
                const barWidth = ((item.value ?? 0) / maxValue) * trackWidth;
                const y = rowGap / 2 + index * (rowHeight + rowGap);
                const color = item.color ?? "#2563eb";
                const textX = labelColumn + trackWidth / 2;

                return (
                  <g
                    key={item.label}
                    transform={`translate(0 ${y})`}
                    className={item.disabled ? "vx-chart__series is-off" : "vx-chart__series"}
                  >
                    <text x={2} y={rowHeight / 2 + 4} className="vx-chart__svg-label">
                      {item.label}
                    </text>
                    <rect
                      x={labelColumn}
                      y={2}
                      height={rowHeight}
                      width={barWidth}
                      rx={6}
                      fill={color}
                      className="vx-chart__bar"
                    />
                    <rect
                      x={labelColumn}
                      y={2}
                      height={rowHeight}
                      width={trackWidth}
                      rx={6}
                      className="vx-chart__bar-outline"
                    />
                    <text
                      x={textX}
                      y={rowHeight / 2 + 2}
                      dominantBaseline="middle"
                      className="vx-chart__value vx-chart__value--track"
                    >
                      {Math.round(item.value)}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
        {footer ? <footer className="vx-chart__footer">{footer}</footer> : null}
      </div>
    );
  }
);

Bars.displayName = "Bars";

export default Bars;
