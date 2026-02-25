import type { HTMLAttributes, ReactNode } from "react";
import "./Dialog.css";

export type DialogProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  title?: ReactNode;
  actions?: ReactNode;
};

export default function Dialog({ open = false, title, actions, className, children, ...props }: DialogProps) {
  if (!open) return null;
  const classes = ["vx-dialog", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className="vx-dialog__wrap">
      <div className={classes} role="dialog" aria-modal="true" {...props}>
        {title ? <header className="vx-dialog__header">{title}</header> : null}
        <div className="vx-dialog__body">{children}</div>
        {actions ? <footer className="vx-dialog__footer">{actions}</footer> : null}
      </div>
    </div>
  );
}
