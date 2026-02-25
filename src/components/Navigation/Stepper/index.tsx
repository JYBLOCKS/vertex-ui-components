import type { CSSProperties, HTMLAttributes } from "react";
import "./Stepper.css";

export type Step = { label: string; completed?: boolean };
export type StepperProps = HTMLAttributes<HTMLUListElement> & {
  steps: Step[];
  active?: number;
};

export default function Stepper({
  steps,
  active = 0,
  className,
  ...props
}: StepperProps) {
  const classes = ["vx-stepper", className ?? ""].filter(Boolean).join(" ");

  const resolveState = (index: number, step: Step) => {
    if (step.completed) return "is-complete";
    if (index < active) return "is-complete";
    if (index === active) return "is-active";
    return "";
  };

  const stateColor = (state: string) => {
    if (state === "is-complete") return "#16a34a";
    if (state === "is-active") return "#2563eb";
    return "#cbd5e1";
  };

  return (
    <ul className={classes} {...props}>
      {steps.map((step, idx) => {
        const state = resolveState(idx, step);
        const prevState =
          idx > 0 ? resolveState(idx - 1, steps[idx - 1]) : state;
        const style = {
          "--vx-step-from": stateColor(prevState),
          "--vx-step-to": stateColor(state),
        } as CSSProperties;

        return (
          <li key={step.label} className={state} style={style}>
            {idx > 0 ? (
              <span className="vx-stepper__connector" aria-hidden />
            ) : null}
            <span className="vx-stepper__bullet">
              <span className="vx-stepper__bullet-glow" />
              <span className="vx-stepper__bullet-content">{idx + 1}</span>
            </span>
            <span className="vx-stepper__label">{step.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
