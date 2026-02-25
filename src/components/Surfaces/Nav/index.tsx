import type { HTMLAttributes, ReactNode } from "react";
import "./Nav.css";

export type NavProps = HTMLAttributes<HTMLElement> & {
  brand?: ReactNode;
  actions?: ReactNode;
};

export default function Nav({ brand, actions, className, children, ...props }: NavProps) {
  const classes = ["vx-nav", className ?? ""].filter(Boolean).join(" ");
  return (
    <nav className={classes} {...props}>
      <div className="vx-nav__brand">{brand}</div>
      <div className="vx-nav__links">{children}</div>
      <div className="vx-nav__actions">{actions}</div>
    </nav>
  );
}
