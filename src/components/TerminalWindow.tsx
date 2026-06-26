import { type ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "ide" | "log";
  tabs?: { label: string; active?: boolean; color?: string }[];
}

export function TerminalWindow({
  title = "zsh",
  subtitle,
  children,
  className = "",
  variant = "default",
  tabs,
}: TerminalWindowProps) {
  return (
    <div className={`term-panel scanlines overflow-hidden font-mono ${className}`}>
      <div className="flex items-center gap-2 border-b border-term-border bg-term-panel-2 px-3 py-2">
        <span className="size-3 rounded-full bg-term-red/80" />
        <span className="size-3 rounded-full bg-term-yellow/80" />
        <span className="size-3 rounded-full bg-term-green/80" />
        {tabs ? (
          <div className="ml-3 flex items-end gap-0 text-xs">
            {tabs.map((t, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 border-b-2 px-3 py-1.5 ${
                  t.active
                    ? "border-term-blue bg-term-panel text-term-fg"
                    : "border-transparent text-term-dim hover:text-term-fg"
                }`}
              >
                <span className={`size-2 rounded-sm`} style={{ background: t.color ?? "var(--term-blue)" }} />
                {t.label}
              </div>
            ))}
          </div>
        ) : (
          <div className="ml-2 flex-1 text-center text-xs text-term-dim">
            {title}
            {subtitle && <span className="ml-2 text-term-dim/60">— {subtitle}</span>}
          </div>
        )}
        <div className="text-xs text-term-dim">
          {variant === "ide" ? "⎈ main" : variant === "log" ? "● live" : "⌘"}
        </div>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
