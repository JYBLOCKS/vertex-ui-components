import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import "../Bars/Bars.css";

export type SankeyLink = { from: string; to: string; value: number };
export type SankeyProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  links?: SankeyLink[];
};

const Sankey = forwardRef<HTMLDivElement, SankeyProps>(
  ({ title = "Sankey", links = [], className, ...props }, ref) => {
    const [hidden, setHidden] = useState<Set<string>>(new Set());
    const filteredLinks = useMemo(
      () => links.filter((link, index) => !hidden.has(`${link.from}-${link.to}-${index}`)),
      [hidden, links]
    );
    const [animatedLinks, setAnimatedLinks] = useState(filteredLinks);
    const previousRef = useRef(filteredLinks);
    const nodeHeight = 16;
    const gap = 12;
    const width = 160;

    useEffect(() => {
      let raf = 0;
      const start = performance.now();
      const duration = 420;
      const previous = previousRef.current;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        setAnimatedLinks(
          filteredLinks.map((link) => {
            const from = previous.find(
              (candidate) => candidate.from === link.from && candidate.to === link.to
            )?.value ?? 0;
            return { ...link, value: from + (link.value - from) * eased };
          })
        );

        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          previousRef.current = filteredLinks;
        }
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [filteredLinks]);

    const nodes = useMemo(() => {
      const left = Array.from(new Set(filteredLinks.map((link) => link.from)));
      const right = Array.from(new Set(filteredLinks.map((link) => link.to)));
      return { left, right };
    }, [filteredLinks]);

    const height = useMemo(() => {
      const rows = Math.max(nodes.left.length, nodes.right.length, 1);
      return rows * (nodeHeight + gap) + gap;
    }, [gap, nodeHeight, nodes.left.length, nodes.right.length]);

    const maxValue = useMemo(() => Math.max(...filteredLinks.map((link) => link.value), 1), [filteredLinks]);
    const classes = ["vx-chart", className ?? ""].filter(Boolean).join(" ");

    const nodeY = (index: number) => gap + index * (nodeHeight + gap);

    return (
      <div ref={ref} className={classes} {...props}>
        <header className="vx-chart__header">{title}</header>
        {links.length > 0 ? (
          <div className="vx-chart__filters">
            {links.map((link, index) => {
              const key = `${link.from}-${link.to}-${index}`;
              const off = hidden.has(key);
              const color = `hsl(${220 + index * 24} 70% 55%)`;
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
                  <span className="vx-chart__legend-swatch" style={{ backgroundColor: color }} />
                  <span className="vx-chart__label">
                    {link.from} {"->"} {link.to}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
        {links.length === 0 ? (
          <p className="vx-chart__empty">Sin datos</p>
        ) : filteredLinks.length === 0 ? (
          <p className="vx-chart__empty">Activa al menos una serie</p>
        ) : (
          <div className="vx-chart__canvas">
            <svg
              className="vx-chart__svg"
              role="img"
              aria-label={`Diagrama Sankey ${title}`}
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMinYMin meet"
            >
              <g className="vx-chart__grid">
                <line x1={width / 2} x2={width / 2} y1={4} y2={height - 4} />
              </g>

              {nodes.left.map((label, index) => (
                <g key={label} transform={`translate(8 ${nodeY(index)})`}>
                  <rect width={54} height={nodeHeight} rx={6} className="vx-chart__node" />
                  <text x={10} y={nodeHeight / 2 + 4} className="vx-chart__svg-label">
                    {label}
                  </text>
                </g>
              ))}

              {nodes.right.map((label, index) => (
                <g key={label} transform={`translate(${width - 62} ${nodeY(index)})`}>
                  <rect width={54} height={nodeHeight} rx={6} className="vx-chart__node" />
                  <text x={10} y={nodeHeight / 2 + 4} className="vx-chart__svg-label">
                    {label}
                  </text>
                </g>
              ))}

              {animatedLinks.map((link, index) => {
                const fromIndex = nodes.left.indexOf(link.from);
                const toIndex = nodes.right.indexOf(link.to);
                const startY = nodeY(Math.max(fromIndex, 0)) + nodeHeight / 2;
                const endY = nodeY(Math.max(toIndex, 0)) + nodeHeight / 2;
                const startX = 62;
                const endX = width - 62;
                const thickness = 4 + (link.value / maxValue) * 10;
                const path = `M ${startX} ${startY} C ${startX + 24} ${startY}, ${
                  endX - 24
                } ${endY}, ${endX} ${endY}`;

                return (
                  <path
                    key={`${link.from}-${link.to}-${index}`}
                    d={path}
                    fill="none"
                    stroke={`hsl(${220 + index * 24} 70% 55%)`}
                    strokeWidth={thickness}
                    className="vx-chart__flow"
                    opacity={0.9}
                  />
                );
              })}
            </svg>
          </div>
        )}
      </div>
    );
  }
);

Sankey.displayName = "Sankey";

export default Sankey;


