import type { HTMLAttributes } from "react";
import "./Pagination.css";

export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
  page: number;
  totalPages: number;
  onChange?: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange, className, ...props }: PaginationProps) {
  const classes = ["vx-pagination", className ?? ""].filter(Boolean).join(" ");

  const change = (next: number) => {
    if (next < 1 || next > totalPages) return;
    onChange?.(next);
  };

  return (
    <div className={classes} {...props}>
      <button type="button" onClick={() => change(page - 1)} disabled={page <= 1}>
        ←
      </button>
      <span>
        Página {page} / {totalPages}
      </span>
      <button type="button" onClick={() => change(page + 1)} disabled={page >= totalPages}>
        →
      </button>
    </div>
  );
}
