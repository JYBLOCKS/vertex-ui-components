import type { HTMLAttributes, ReactNode } from "react";
import "./Alert.css";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "info" | "success" | "warning" | "error";
  title?: ReactNode;
};

export default function Alert({ tone = "info", title, className, children, ...props }: AlertProps) {
  const classes = ["vx-alert", `vx-alert--${tone}`, className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} role="alert" {...props}>
      {title ? <strong className="vx-alert__title">{title}</strong> : null}
      {children ? <div className="vx-alert__body">{children}</div> : null}
    </div>
  );
}
