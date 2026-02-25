import type { HTMLAttributes, ReactNode } from "react";
import "./Menu.css";

export type MenuItem = { label: ReactNode; onClick?: () => void; href?: string };
export type MenuProps = HTMLAttributes<HTMLUListElement> & { items: MenuItem[] };

export default function Menu({ items, className, ...props }: MenuProps) {
  const classes = ["vx-menu", className ?? ""].filter(Boolean).join(" ");
  return (
    <ul className={classes} {...props}>
      {items.map((item, idx) => (
        <li key={idx}>
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <button type="button" onClick={item.onClick}>
              {item.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
