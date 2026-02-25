import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  actions?: ReactNode;
};

export default function Card({ title, actions, className, children, ...props }: CardProps) {
  const classes = ["vx-card", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      {(title || actions) && (
        <header className="vx-card__header">
          <div>{title}</div>
          {actions ? <div className="vx-card__actions">{actions}</div> : null}
        </header>
      )}
      <div className="vx-card__body">{children}</div>
    </div>
  );
}
