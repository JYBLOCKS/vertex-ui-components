import type { SelectHTMLAttributes } from "react";
import { forwardRef } from "react";
import "./Select.css";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    const classes = ["vx-select", className ?? ""].filter(Boolean).join(" ");
    return (
      <select ref={ref} className={classes} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
