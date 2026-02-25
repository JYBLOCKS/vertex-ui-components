import { useState, type HTMLAttributes, type ReactNode } from "react";
import "./Accordion.css";

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };
export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  items: AccordionItem[];
};

export default function Accordion({ items, className, ...props }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const classes = ["vx-accordion", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {items.map((item) => {
        const open = item.id === openId;
        return (
          <div key={item.id} className="vx-accordion__item">
            <button type="button" onClick={() => setOpenId(open ? null : item.id)}>
              <span>{item.title}</span>
              <span aria-hidden>{open ? "−" : "+"}</span>
            </button>
            {open ? <div className="vx-accordion__content">{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
