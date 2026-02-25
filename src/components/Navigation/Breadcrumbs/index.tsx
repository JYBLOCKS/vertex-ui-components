import type { HTMLAttributes } from "react";
import "./Breadcrumbs.css";

export type Crumb = { label: string; href?: string; onClick?: () => void };
export type BreadcrumbsProps = HTMLAttributes<HTMLElement> & { items: Crumb[] };

export default function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  const classes = ["vx-breadcrumbs", className ?? ""].filter(Boolean).join(" ");
  return (
    <nav className={classes} aria-label="Breadcrumb" {...props}>
      <ol>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          if (isLast) {
            return (
              <li key={item.label} aria-current="page">
                {item.label}
              </li>
            );
          }
          return (
            <li key={item.label}>
              {item.href ? (
                <a href={item.href} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : (
                <button type="button" onClick={item.onClick}>
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
