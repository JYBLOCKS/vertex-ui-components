import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import "./InputArea.css";

export type InputAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({ className, ...props }, ref) => {
    const classes = ["vx-input-area", className ?? ""].filter(Boolean).join(" ");

    return <textarea ref={ref} className={classes} {...props} />;
  }
);

InputArea.displayName = "InputArea";

export default InputArea;
