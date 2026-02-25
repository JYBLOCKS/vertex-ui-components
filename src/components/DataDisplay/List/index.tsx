import type { HTMLAttributes, ReactNode } from "react";
import "./List.css";

export type ListItem = { content: ReactNode };
export type ListProps = HTMLAttributes<HTMLUListElement> & {
  items?: ListItem[];
};

export default function List({ items = [], className, ...props }: ListProps) {
  const classes = ["vx-list", className ?? ""].filter(Boolean).join(" ");
  return (
    <ul className={classes} {...props}>
      {items.map((item, idx) => (
        <li key={idx} className="vx-list__item">
          <div>
            <div className="vx-list__title">{item.content ?? null}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
