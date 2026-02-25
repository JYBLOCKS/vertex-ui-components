import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import "./Checkbox.css";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    const classes = ["vx-checkbox", className ?? ""].filter(Boolean).join(" ");

    return (
      <label className={classes}>
        <input ref={ref} type="checkbox" {...props} />
        <span className="vx-checkbox__mark" />
        {label ? <span className="vx-checkbox__label">{label}</span> : null}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
