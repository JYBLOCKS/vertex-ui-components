import type { HTMLAttributes, ReactNode } from "react";
import "./Footer.css";

export type FooterProps = HTMLAttributes<HTMLElement> & {
  left?: ReactNode;
  right?: ReactNode;
};

export default function Footer({ left, right, className, children, ...props }: FooterProps) {
  const classes = ["vx-footer", className ?? ""].filter(Boolean).join(" ");
  return (
    <footer className={classes} {...props}>
      <div className="vx-footer__side">{left}</div>
      <div className="vx-footer__main">{children}</div>
      <div className="vx-footer__side">{right}</div>
    </footer>
  );
}
