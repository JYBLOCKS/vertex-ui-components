import { useEffect } from "react";
import type { MutableRefObject } from "react";

export type ClickAwayProps = {
  ref: MutableRefObject<HTMLElement | null>;
  onClickAway: (event: MouseEvent | TouchEvent) => void;
};

export function useClickAway({ ref, onClickAway }: ClickAwayProps) {
  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(event.target as Node)) {
        onClickAway(event);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onClickAway, ref]);
}
