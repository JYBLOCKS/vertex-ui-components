import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./Link.css";

export type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export default function NavLink({ leadingIcon, trailingIcon, className, children, ...props }: NavLinkProps) {
  const classes = ["vx-link", className ?? ""].filter(Boolean).join(" ");
  return (
    <a className={classes} {...props}>
      {leadingIcon ? <span className="vx-link__icon">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="vx-link__icon">{trailingIcon}</span> : null}
    </a>
  );
}
