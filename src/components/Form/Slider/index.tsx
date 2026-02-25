import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./Slider.css";

export type SliderProps = InputHTMLAttributes<HTMLInputElement>;

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, ...props }, ref) => {
    const classes = ["vx-slider", className ?? ""].filter(Boolean).join(" ");

    return <input ref={ref} type="range" className={classes} {...props} />;
  }
);

Slider.displayName = "Slider";

export default Slider;
