import type { HTMLAttributes, ReactElement, SVGProps } from "react";
import "./Icons.css";

export type IconName =
  | "spark"
  | "stack"
  | "bolt"
  | "chat"
  | "target"
  | "shield-check"
  | "wave"
  | "cube"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "arrow-down"
  | "calendar"
  | "clock"
  | "bell"
  | "mail"
  | "heart"
  | "check"
  | "x"
  | "cloud"
  | "sun"
  | "moon"
  | "plane"
  | "dog"
  | "cat"
  | "paw"
  | "tree"
  | "github"
  | "twitter"
  | "linkedin";

type IconSize = "sm" | "md" | "lg";

export type IconsProps = HTMLAttributes<SVGSVGElement> & {
  name?: IconName;
  size?: number | IconSize;
  color?: string;
  strokeWidth?: number;
};

const paths: Record<
  IconName,
  (color: string, strokeWidth: number) => ReactElement
> = {
  spark: (c, s) => (
    <>
      <path
        d="M12 3.5 13.9 8l4.6 1L13.9 11.5 12 16l-1.9-4.5L5.5 9l4.6-1z"
        fill={c}
        opacity="0.14"
      />
      <path
        d="m12 4.5 1.4 3.2 3.5.76-3.5 1.04L12 12l-1.4-2.5-3.5-1.04 3.5-.76z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <path
        d="M12 14.25v4.25m-3.5-4.25-2.25 2.25M15.5 14.25l2.25 2.25M12 5.5V2"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
      />
    </>
  ),
  stack: (c, s) => (
    <>
      <path
        d="M5 10.5 12 14l7-3.5"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7.5 12 11l7-3.5L12 4z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <path
        d="m5 13.5 7 3.5 7-3.5"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  bolt: (c, s) => (
    <>
      <path
        d="m11 2-5 10h4l-1 8 6-10h-4l3-8z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <path
        d="M9.25 9.5h2.3"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
      />
    </>
  ),
  chat: (c, s) => (
    <>
      <path
        d="M6.5 17.5 5 20l3-1.2c5.5 1.4 10-2.1 10-6.3 0-3.5-3.1-6.5-7-6.5S4 9 4 12.5c0 1.8.8 3.4 2.2 4.6l.3.4"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.25" cy="12" r="0.75" fill={c} />
      <circle cx="12" cy="12" r="0.75" fill={c} />
      <circle cx="14.75" cy="12" r="0.75" fill={c} />
    </>
  ),
  target: (c, s) => (
    <>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke={c} strokeWidth={s} />
      <circle cx="12" cy="12" r="3" fill="none" stroke={c} strokeWidth={s} />
      <path
        d="M12 5.5V3m0 18v-2.5M5.5 12H3m18 0h-2.5"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1" fill={c} />
    </>
  ),
  "shield-check": (c, s) => (
    <>
      <path
        d="M12 4.2 6 6.5v4.6c0 3.1 2.6 5.9 6 7.7 3.4-1.8 6-4.6 6-7.7V6.5z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <path
        d="m9.2 12.1 2.1 2.1 4-4.3"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  wave: (c, s) => (
    <>
      <path
        d="M4 14.5c1.4-.6 2.7-.2 4 .6 1.3.9 2.6 1.5 4 0.6 1.3-.9 2.6-1.5 4-.6 1 .6 2 .8 3 .1"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
      />
      <path
        d="M4 9.5c1.4-.6 2.7-.2 4 .6 1.3.9 2.6 1.5 4 0.6 1.3-.9 2.6-1.5 4-.6 1 .6 2 .8 3 .1"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        opacity="0.7"
      />
    </>
  ),
  cube: (c, s) => (
    <>
      <path
        d="M12 3 6 6v6l6 3 6-3V6z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <path
        d="M6 6.2 12 9l6-2.8M12 9v6"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
    </>
  ),
  "arrow-left": (c, s) => (
    <path
      d="m13.5 6-5 6 5 6m-5-6h7"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "arrow-right": (c, s) => (
    <path
      d="m10.5 6 5 6-5 6m5-6h-7"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "arrow-up": (c, s) => (
    <path
      d="m6 13.5 6-5 6 5m-6-5v11"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "arrow-down": (c, s) => (
    <path
      d="m6 10.5 6 5 6-5m-6 5v-11"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  calendar: (c, s) => (
    <>
      <rect
        x="4"
        y="6.5"
        width="16"
        height="12"
        rx="1.5"
        fill="none"
        stroke={c}
        strokeWidth={s}
      />
      <path
        d="M4 9.5h16M9 4v3m6-3v3"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
      />
      <path d="M9 12h2v2H9zM13 12h2v2h-2z" fill={c} opacity="0.4" />
    </>
  ),
  clock: (c, s) => (
    <>
      <circle cx="12" cy="12" r="7.5" fill="none" stroke={c} strokeWidth={s} />
      <path
        d="M12 8v4l3 1.5"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  bell: (c, s) => (
    <>
      <path
        d="M8.5 17.5h7m-6.5-2V11a3 3 0 0 1 6 0v4.5"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
      />
      <path
        d="M7 14.5h10l-1-1.6c-.6-.96-.9-2.06-.9-3.18V9a3 3 0 0 0-6 0v.72c0 1.12-.32 2.22-.94 3.18z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="19.2" r="1" fill={c} />
    </>
  ),
  mail: (c, s) => (
    <>
      <rect
        x="4"
        y="6.5"
        width="16"
        height="11"
        rx="1.5"
        fill="none"
        stroke={c}
        strokeWidth={s}
      />
      <path
        d="m5.5 8 6.5 4 6.5-4"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  heart: (c, s) => (
    <path
      d="M12 19s-6.5-3.8-6.5-8.6C5.5 7 7 5.5 9 5.5c1.2 0 2.2.6 3 1.5.8-.9 1.8-1.5 3-1.5 2 0 3.5 1.5 3.5 4.9C18.5 15.2 12 19 12 19Z"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  check: (c, s) => (
    <path
      d="m6.5 12.5 3 3 8-7"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  x: (c, s) => (
    <path
      d="M7 7l10 10M17 7 7 17"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
    />
  ),
  cloud: (c, s) => (
    <path
      d="M8.5 18.5h8a3 3 0 0 0 0-6c-.2 0-.3 0-.5.02A4.5 4.5 0 0 0 7 10.5a3.5 3.5 0 0 0 1.5 6.7Z"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sun: (c, s) => (
    <>
      <circle cx="12" cy="12" r="4" fill="none" stroke={c} strokeWidth={s} />
      <path
        d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.1-6.1 1.4-1.4M4.5 19.5l1.4-1.4m0-11.2L4.5 5.5M19.5 19.5l-1.4-1.4"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
      />
    </>
  ),
  moon: (c, s) => (
    <path
      d="M17 15.5a6.5 6.5 0 1 1-6.2-10 6 6 0 1 0 6.2 10Z"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  plane: (c, s) => (
    <>
      <path
        d="m3.5 12 17-7-5.2 7 5.2 7z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <path
        d="m10.5 13 5 6-8-6-3 1.5"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  dog: (c, s) => (
    <>
      <path
        d="M6 10.5 4.5 7 7 8.5 8.5 7l2 3.5"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8v4.5c0 1-1 2-2 2h-4c-1 0-2-1-2-2z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <circle cx="15.2" cy="13.5" r="0.6" fill={c} />
    </>
  ),
  cat: (c, s) => (
    <>
      <path
        d="M8 9.5V6l2.5 1.5L13 6v3.5"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <path
        d="M7 12.5c0 3.5 2.2 5.5 5 5.5s5-2 5-5.5c0-1.8-1.8-3-5-3s-5 1.2-5 3Z"
        fill="none"
        stroke={c}
        strokeWidth={s}
      />
      <path d="M10.5 13.5h3" stroke={c} strokeWidth={s} strokeLinecap="round" />
      <path
        d="M11 15.5c.6.5 1.4.5 2 0"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
      />
      <circle cx="10" cy="12.5" r="0.5" fill={c} />
      <circle cx="14" cy="12.5" r="0.5" fill={c} />
    </>
  ),
  paw: (c, s) => (
    <>
      <path
        d="M9 13.5c-1 1.2-.7 3 1.1 3.6a7 7 0 0 0 3.8 0c1.8-.6 2.1-2.4 1.1-3.6-1-1.2-2.8-1.8-3-3.3-.2 1.5-2 2.1-3 3.3Z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinejoin="round"
      />
      <circle cx="8" cy="9" r="1.1" fill="none" stroke={c} strokeWidth={s} />
      <circle cx="12" cy="8.5" r="1.1" fill="none" stroke={c} strokeWidth={s} />
      <circle cx="16" cy="9" r="1.1" fill="none" stroke={c} strokeWidth={s} />
      <circle cx="10" cy="7" r="1" fill={c} opacity="0.65" />
    </>
  ),
  tree: (c, s) => (
    <>
      <path
        d="M12 4 8 10h3l-2.5 4H12l-1 4"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4 16 10h-3l2.5 4H12"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  github: (c, s) => (
    <path
      d="M12 3.5c-4.4 0-8 3.3-8 7.5 0 3.3 2.1 6 5 6.9v-2.7c0-.8.6-1.3 1-1.5-2.2-.2-3.5-.9-3.5-3 0-.6.2-1.2.7-1.6-.3-.8 0-1.7.1-1.8.9 0 1.5.6 1.9 1 .5-.2 1.1-.3 1.8-.3s1.3.1 1.8.3c.4-.4 1-.9 1.9-1 .1.1.4 1 .1 1.8.5.4.7 1 .7 1.6 0 2.1-1.3 2.8-3.5 3 .6.4 1 1.1 1 2v2.7c2.9-.9 5-3.6 5-6.9 0-4.2-3.6-7.5-8-7.5Z"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  twitter: (c, s) => (
    <path
      d="M19.5 7.5c-.6.3-1.3.5-2 .6a3.3 3.3 0 0 0-5.7 2.2v.5c-3 0-5.5-1.3-7.3-3.4-.7 1.2-.2 2.8.9 3.6-.6 0-1.1-.2-1.6-.4 0 1.4 1 2.7 2.4 3-.5.1-1 .1-1.4 0 .4 1.2 1.6 2 3 2A6.6 6.6 0 0 1 3 17.5a9.2 9.2 0 0 0 5 1.4c6 0 9.3-4.7 9.3-8.8v-.4a6.4 6.4 0 0 0 1.7-1.7Z"
      fill="none"
      stroke={c}
      strokeWidth={s}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  linkedin: (c, s) => (
    <>
      <rect
        x="4.5"
        y="9"
        width="3"
        height="9"
        rx="0.6"
        fill="none"
        stroke={c}
        strokeWidth={s}
      />
      <circle cx="6" cy="6" r="1.3" fill="none" stroke={c} strokeWidth={s} />
      <path
        d="M10.5 9h2.8c2 0 3.2 1.2 3.2 3.1V18h-3v-4.2c0-.8-.4-1.5-1.3-1.5-.8 0-1.2.7-1.2 1.5V18h-3V9Z"
        fill="none"
        stroke={c}
        strokeWidth={s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

const sizeMap: Record<IconSize, number> = { sm: 20, md: 32, lg: 44 };

export default function Icons({
  name = "spark",
  size = "md",
  color = "currentColor",
  strokeWidth = 1.6,
  className,
  ...props
}: IconsProps) {
  const classes = ["vx-icon", className ?? ""].filter(Boolean).join(" ");
  const render = paths[name];
  const resolvedSize =
    typeof size === "number" ? size : sizeMap[size] ?? sizeMap.md;

  if (!render) {
    return (
      <svg
        className={classes}
        width={resolvedSize}
        height={resolvedSize}
        viewBox="0 0 24 24"
        aria-label={name}
        {...(props as SVGProps<SVGSVGElement>)}
      >
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill={color}>
          ?
        </text>
      </svg>
    );
  }

  return (
    <svg
      className={classes}
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="none"
      aria-label={name}
      {...(props as SVGProps<SVGSVGElement>)}
    >
      {render(color, strokeWidth)}
    </svg>
  );
}
