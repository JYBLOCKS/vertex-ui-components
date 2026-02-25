import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./TimePicker.css";

export type TimePickerProps = InputHTMLAttributes<HTMLInputElement>;

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, ...props }, ref) => {
    const classes = ["vx-time-picker", className ?? ""].filter(Boolean).join(" ");

    return <input ref={ref} type="time" className={classes} {...props} />;
  }
);

TimePicker.displayName = "TimePicker";

export default TimePicker;
