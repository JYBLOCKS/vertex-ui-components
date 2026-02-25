import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import "./Avatar.css";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name?: string;
  src?: string;
  size?: number;
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ name = "User", src, size = 48, className, ...props }, ref) => {
    const initials = name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("");

    const classes = ["vx-avatar", className ?? ""].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        style={{ width: size, height: size, fontSize: size / 3 }}
        aria-label={name}
        {...props}
      >
        {src ? <img src={src} alt={name} /> : <span>{initials || "?"}</span>}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
