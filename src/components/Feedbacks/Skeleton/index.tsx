import type { HTMLAttributes } from "react";
import "./Skeleton.css";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
};

export default function Skeleton({ width = "100%", height = 14, rounded = true, className, style, ...props }: SkeletonProps) {
  const classes = ["vx-skeleton", rounded ? "vx-skeleton--rounded" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <div
      className={classes}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}
