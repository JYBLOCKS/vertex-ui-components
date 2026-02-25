import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./DatePicker.css";

export type DatePickerProps = InputHTMLAttributes<HTMLInputElement>;

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, ...props }, ref) => {
    const classes = ["vx-date-picker", className ?? ""]
      .filter(Boolean)
      .join(" ");

    return <input ref={ref} type="datetime-local" className={classes} {...props} />;
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
