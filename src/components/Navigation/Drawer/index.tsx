import type { HTMLAttributes, ReactNode } from "react";
import "./Drawer.css";

export type DrawerProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  placement?: "left" | "right";
  header?: ReactNode;
  footer?: ReactNode;
};

export default function Drawer({ open = false, placement = "left", header, footer, className, children, ...props }: DrawerProps) {
  if (!open) return null;
  const classes = ["vx-drawer", `vx-drawer--${placement}`, className ?? ""].filter(Boolean).join(" ");
  return (
    <div className="vx-drawer__wrap">
      <div className={classes} role="dialog" aria-modal="true" {...props}>
        {header ? <header className="vx-drawer__header">{header}</header> : null}
        <div className="vx-drawer__body">{children}</div>
        {footer ? <footer className="vx-drawer__footer">{footer}</footer> : null}
      </div>
    </div>
  );
}
