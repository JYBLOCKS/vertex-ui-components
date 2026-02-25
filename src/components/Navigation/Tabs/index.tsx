import { useState, type ReactNode, type HTMLAttributes } from "react";
import "./Tabs.css";

export type Tab = { id: string; label: string; content: ReactNode };
export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  tabs: Tab[];
  defaultTab?: string;
};

export default function Tabs({ tabs, defaultTab, className, ...props }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];
  const classes = ["vx-tabs", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      <div className="vx-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab?.id}
            className={tab.id === activeTab?.id ? "is-active" : undefined}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="vx-tabs__panel" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  );
}
