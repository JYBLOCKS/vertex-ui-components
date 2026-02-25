import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import "../Bars/Bars.css";

export type PyramidProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  levels?: Array<{ label: string; value: number }>;
};

const Pyramid = forwardRef<HTMLDivElement, PyramidProps>(
  ({ title = "Pyramid", levels = [], className, ...props }, ref) => {
    const [hidden, setHidden] = useState<Set<string>>(new Set());
    const pyramidLevels = useMemo(
      () =>
        levels
          .map((level) => ({
            ...level,
            disabled: hidden.has(level.label),
          }))
          .sort((a, b) => b.value - a.value),
      [hidden, levels]
    );

    const palette = (index: number) => `hsl(${28 + index * 10} 86% 58%)`;
    const colorFor = (label: string) => {
      const idx = pyramidLevels.findIndex((entry) => entry.label === label);
      return palette(Math.max(idx, 0));
    };

    const [animatedLevels, setAnimatedLevels] = useState(pyramidLevels);
    const previousRef = useRef(pyramidLevels);
    const baseWidth = 120;
    const viewPadding = 12;
    const rowHeight = 22;
    const viewWidth = baseWidth + viewPadding * 2;

    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const duration = 420;
      const previous = previousRef.current;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        setAnimatedLevels(
          pyramidLevels.map((level) => {
            const from = previous.find((item) => item.label === level.label)?.value ?? 0;
            return { ...level, value: from + (level.value - from) * eased };
          })
        );

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          previousRef.current = pyramidLevels;
        }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [pyramidLevels]);

    const classes = ["vx-chart", className ?? ""].filter(Boolean).join(" ");
    const totalLevels = pyramidLevels.length || 1;
    const height = totalLevels * rowHeight;
    const slopeStep = baseWidth / totalLevels;
    const pyramidVars = useMemo(
      () =>
        ({
          "--vx-pyramid-levels": totalLevels,
          "--vx-pyramid-row-height": `${rowHeight}px`,
        }) as CSSProperties,
      [rowHeight, totalLevels]
    );
    const activeCount = levels.filter((level) => !hidden.has(level.label)).length;

    return (
      <div ref={ref} className={classes} {...props}>
        <header className="vx-chart__header">{title}</header>
        {levels.length > 0 ? (
          <div className="vx-chart__filters">
            {pyramidLevels.map((level) => {
              const off = hidden.has(level.label);
              return (
                <button
                  key={level.label}
                  type="button"
                  className={`vx-chart__filter ${off ? "is-off" : ""}`}
                  onClick={() =>
                    setHidden((prev) => {
                      const next = new Set(prev);
                      if (next.has(level.label)) {
                        next.delete(level.label);
                      } else {
                        next.add(level.label);
                      }
                      return next;
                    })
                  }
                >
                  <span className="vx-chart__legend-swatch" style={{ backgroundColor: colorFor(level.label) }} />
                  <span className="vx-chart__label">{level.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
        {levels.length === 0 ? (
          <p className="vx-chart__empty">Sin datos</p>
        ) : activeCount === 0 ? (
          <p className="vx-chart__empty">Activa al menos una serie</p>
        ) : (
          <div className="vx-chart__canvas vx-chart__canvas--pyramid" style={pyramidVars}>
            <div className="vx-chart__pyramid-shell">
              <svg
                className="vx-chart__svg"
                role="img"
                aria-label={`Piramide ${title}`}
                viewBox={`0 0 ${viewWidth} ${height}`}
              >
                {animatedLevels.map((level, index) => {
                  const widthBottom = baseWidth - index * slopeStep;
                  const widthTop = Math.max(baseWidth - (index + 1) * slopeStep, 0);
                  const bottomY = height - index * rowHeight;
                  const topY = bottomY - rowHeight;
                  const centerX = viewWidth / 2;
                  const xBottom = centerX - widthBottom / 2;
                  const xTop = centerX - widthTop / 2;
                  const color = colorFor(level.label);
                  const labelY = (bottomY + topY) / 2;

                  return (
                    <g
                      key={level.label}
                      className={`vx-chart__series ${level.disabled ? "is-off" : ""}`}
                    >
                      <polygon
                        points={`${xBottom},${bottomY} ${viewWidth - xBottom},${bottomY} ${viewWidth - xTop},${topY} ${xTop},${topY}`}
                        fill={color}
                        opacity={0.9}
                      />
                      <text
                        x={centerX}
                        y={labelY + 1}
                        textAnchor="middle"
                        className="vx-chart__pyramid-text"
                      >
                        {Math.round(level.value)}%
                      </text>
                    </g>
                  );
                })}
              </svg>
              <div className="vx-chart__pyramid-values">
                {pyramidLevels.map((level, index) => (
                  <div
                    key={level.label}
                    className={`vx-chart__pyramid-row ${level.disabled ? "is-off" : ""}`}
                  >
                    <span className="vx-chart__legend-swatch" style={{ backgroundColor: colorFor(level.label) }} />
                    <span className="vx-chart__label">{level.label}</span>
                    <span className="vx-chart__pyramid-figure">
                      {Math.round(animatedLevels[index]?.value ?? level.value)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Pyramid.displayName = "Pyramid";

export default Pyramid;
