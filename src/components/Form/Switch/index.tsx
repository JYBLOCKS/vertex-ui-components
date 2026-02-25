import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import "./Switch.css";

export type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, ...props }, ref) => {
    const classes = ["vx-switch", className ?? ""].filter(Boolean).join(" ");

    return (
      <label className={classes}>
        <input ref={ref} type="checkbox" role="switch" {...props} />
        <span className="vx-switch__track">
          <span className="vx-switch__thumb" />
        </span>
        {label ? <span className="vx-switch__label">{label}</span> : null}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
