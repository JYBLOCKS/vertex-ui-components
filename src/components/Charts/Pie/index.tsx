import type { HTMLAttributes } from "react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import "../Bars/Bars.css";

export type PieProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  data?: Array<{ label: string; value: number; color?: string }>;
};

const Pie = forwardRef<HTMLDivElement, PieProps>(
  ({ title = "Pie", data = [], className, ...props }, ref) => {
    const [hidden, setHidden] = useState<Set<string>>(new Set());
    const filteredData = useMemo(
      () => data.filter((item) => !hidden.has(item.label)),
      [data, hidden]
    );
    const [animatedData, setAnimatedData] = useState(filteredData);
    const previousRef = useRef(filteredData);
    const total = filteredData.reduce((sum, item) => sum + item.value, 0);
    const radius = 42;
    const center = 60;
    const viewBox = 120;

    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const duration = 420;
      const previous = previousRef.current;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        setAnimatedData(
          filteredData.map((item) => {
            const from =
              previous.find((entry) => entry.label === item.label)?.value ?? 0;
            const value = from + (item.value - from) * eased;
            return { ...item, value };
          })
        );

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          previousRef.current = filteredData;
        }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [filteredData]);

    const slices = useMemo(() => {
      if (animatedData.length === 0) return [];
      const sum = Math.max(
        animatedData.reduce((acc, item) => acc + item.value, 0),
        1
      );
      let startAngle = -90;

      return animatedData.map((item) => {
        const angle = (item.value / sum) * 360;
        const start = startAngle;
        const end = startAngle + angle;
        startAngle = end;

        return {
          ...item,
          start,
          end,
          percent: ((item.value / sum) * 100).toFixed(1),
        };
      });
    }, [animatedData]);

    const polarToCartesian = (angle: number) => {
      const rad = ((angle - 90) * Math.PI) / 180;
      return {
        x: center + radius * Math.cos(rad),
        y: center + radius * Math.sin(rad),
      };
    };

    const describeArc = (start: number, end: number) => {
      const startPoint = polarToCartesian(end);
      const endPoint = polarToCartesian(start);
      const largeArcFlag = end - start <= 180 ? "0" : "1";
      return `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endPoint.x} ${endPoint.y} L ${center} ${center} Z`;
    };

    const classes = ["vx-chart", className ?? ""].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        <header className="vx-chart__header">{title}</header>
        {data.length > 0 ? (
          <div className="vx-chart__legend vx-chart__legend--interactive">
            {data.map((item, index) => {
              const off = hidden.has(item.label);
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`vx-chart__legend-item vx-chart__filter ${
                    off ? "is-off" : ""
                  }`}
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
                    style={{
                      backgroundColor:
                        item.color ??
                        ["#22c55e", "#2563eb", "#f97316", "#a855f7"][index % 4],
                    }}
                  />
                  <span className="vx-chart__label">{item.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
        {data.length === 0 ? (
          <p className="vx-chart__empty">Sin datos</p>
        ) : filteredData.length === 0 ? (
          <p className="vx-chart__empty">Activa al menos una serie</p>
        ) : (
          <div className="vx-chart__canvas">
            <svg
              className="vx-chart__svg"
              role="img"
              aria-label={`Grafico de pastel ${title}`}
              viewBox={`0 0 ${viewBox} ${viewBox}`}
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={total === 0 ? "#e2e8f0" : "transparent"}
                strokeWidth="8"
              />
              {slices.map((slice, index) => (
                <path
                  key={slice.label}
                  d={describeArc(slice.start, slice.end)}
                  fill={
                    slice.color ??
                    ["#22c55e", "#2563eb", "#f97316", "#a855f7"][index % 4]
                  }
                  className="vx-chart__pie-slice"
                />
              ))}
            </svg>
            <div className="vx-chart__legend">
              {slices.map((slice, index) => (
                <div key={slice.label} className="vx-chart__legend-item">
                  <span
                    className="vx-chart__legend-swatch"
                    style={{
                      backgroundColor:
                        slice.color ??
                        ["#22c55e", "#2563eb", "#f97316", "#a855f7"][index % 4],
                    }}
                  />
                  <span className="vx-chart__label">{slice.label}</span>
                  <span className="vx-chart__value">{slice.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Pie.displayName = "Pie";

export default Pie;
