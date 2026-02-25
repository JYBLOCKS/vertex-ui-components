import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./Calendar.css";

export type CalendarProps = InputHTMLAttributes<HTMLInputElement>;

const Calendar = forwardRef<HTMLInputElement, CalendarProps>(
  ({ className, ...props }, ref) => {
    const classes = ["vx-calendar", className ?? ""].filter(Boolean).join(" ");

    return <input ref={ref} type="date" className={classes} {...props} />;
  }
);

Calendar.displayName = "Calendar";

export default Calendar;
