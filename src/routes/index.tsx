import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Typewriter } from "@/components/Typewriter";
import { TerminalWindow } from "@/components/TerminalWindow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GitLaid — ssh into a girlfriend" },
      {
        name: "description",
        content:
          "git clone love. The only dating app where you ssh into a Daytona box and yap with another lonely dev for 5 minutes. No humans online? We spawn a Chadbot.",
      },
      { property: "og:title", content: "GitLaid — ssh into a girlfriend" },
      {
        property: "og:description",
        content: "Cope harder. Match faster. Powered by Daytona. AI girlfriend fallback included.",
      },
    ],
  }),
  component: GitLaidLanding,
});

const DAYTONA_URL =
  "https://8000-839f8b4c-960f-4a90-9b60-a431090a7dc6.proxy.daytona.work";

/* ─────────────────────────────────────────── utilities ─────────────────────────────────────────── */

function MatrixRain() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const cols = useMemo(() => {
    if (!mounted) return [] as { left: number; delay: number; dur: number; chars: string }[];
    const arr: { left: number; delay: number; dur: number; chars: string }[] = [];
    const glyphs = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ$#%&@*!?<>+={}[]";
    for (let i = 0; i < 28; i++) {
      let s = "";
      for (let j = 0; j < 30; j++) s += glyphs[Math.floor(Math.random() * glyphs.length)] + "\n";
      arr.push({
        left: (i / 28) * 100,
        delay: Math.random() * -10,
        dur: 8 + Math.random() * 10,
        chars: s,
      });
    }
    return arr;
  }, [mounted]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]">
      {cols.map((c, i) => (
        <div
          key={i}
          className="matrix-col absolute top-0 whitespace-pre text-xs leading-tight"
          style={{
            left: `${c.left}%`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.chars}
        </div>
      ))}
    </div>
  );
}

function StatusBar() {
  const [time, setTime] = useState(() => new Date().toISOString().split("T")[1]?.slice(0, 8) ?? "");
  useEffect(() => {
    const i = setInterval(() => setTime(new Date().toISOString().split("T")[1]?.slice(0, 8) ?? ""), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-6 items-center gap-3 border-t border-term-border bg-term-panel-2 px-3 text-[11px] text-term-dim">
      <span className="flex items-center gap-1">
        <span className="size-2 rounded-full bg-term-green pulse-dot" /> connected
      </span>
      <span>main ↑3 ↓0</span>
      <span>tmux: 1 win</span>
      <span className="hidden sm:inline">utf-8</span>
      <span className="hidden sm:inline">LF</span>
      <span className="hidden sm:inline">typescript</span>
      <div className="flex-1" />
      <span className="hidden sm:inline">CPU 87% / love 0%</span>
      <span>{time} UTC</span>
    </div>
  );
}

function TopBar({ status }: { status: string }) {
  return (
    <div className="sticky top-0 z-40 flex h-10 items-center gap-3 border-b border-term-border bg-term-panel/80 px-3 text-xs backdrop-blur">
      <div className="flex items-center gap-2 font-bold">
        <span className="text-term-pink glow-pink">♥</span>
        <span className="text-term-green">git</span>
        <span className="text-term-fg">laid</span>
        <span className="ml-1 rounded-sm bg-term-orange/20 px-1.5 py-0.5 text-[10px] text-term-orange">
          v0.1.0-alpha-hackathon
        </span>
      </div>
      <span className="hidden text-term-dim md:inline">~/love/gitlaid</span>
      <div className="flex-1" />
      <nav className="hidden gap-4 text-term-dim md:flex">
        {[
          ["#demo", "demo"],
          ["#how", "how_it_works"],
          ["#features", "features"],
          ["#ai", "ai_mode"],
          ["#stats", "the_problem"],
          ["#testimonials", "git_log"],
          ["#pricing", "pricing"],
          ["#faq", "faq"],
        ].map(([h, l]) => (
          <a key={h} href={h} className="hover:text-term-green">
            {l}
          </a>
        ))}
      </nav>
      <span className="rounded border border-term-green/30 bg-term-green/10 px-2 py-0.5 text-term-green">
        ● {status}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────── boot / hero ─────────────────────────────────────────── */

const BOOT_LINES = [
  { t: "Booting cope.exe...", color: "text-term-fg" },
  { t: "Loading rizz module...", color: "text-term-fg" },
  { t: "ERROR: rizz not found (have you tried the gym?)", color: "text-term-red" },
  { t: "Retrying as Sigma...", color: "text-term-yellow" },
  { t: "Tunneling into Daytona...", color: "text-term-blue" },
  { t: "Spinning up workspace [▓▓▓▓▓▓▓▓▓▓] 100%", color: "text-term-green" },
  { t: "Scanning for another touch-grass-deprived dev...", color: "text-term-fg" },
  { t: "", color: "" },
  { t: "She found you. (cope)", color: "text-term-green glow-green" },
];

function BootSequence({ onDone }: { onDone?: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= BOOT_LINES.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setI((v) => v + 1), i === 5 ? 900 : i === 8 ? 600 : 550);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <div className="space-y-1 font-mono text-sm">
      {BOOT_LINES.slice(0, i).map((line, idx) => (
        <div key={idx} className={line.color}>
          {line.t && (
            <>
              <span className="text-term-dim">[{String(idx).padStart(2, "0")}]</span>{" "}
              {idx === i - 1 ? <Typewriter text={line.t} speed={14} showCaret={false} /> : line.t}
            </>
          )}
        </div>
      ))}
      {i >= BOOT_LINES.length && <span className="caret" />}
    </div>
  );
}

function Hero() {
  const [bootDone, setBootDone] = useState(false);
  return (
    <section className="relative overflow-hidden border-b border-term-border">
      <MatrixRain />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-term-green/30 bg-term-green/5 px-3 py-1 text-xs text-term-green">
            <span className="size-1.5 rounded-full bg-term-green pulse-dot" />
            powered by daytona &nbsp;·&nbsp; coded by virgins, for virgins
          </div>
          <h1 className="font-mono text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            <span className="text-term-fg">Your </span>
            <span className="text-term-green glow-green">GitHub streak</span>
            <span className="text-term-fg"> is huge.</span>
            <br />
            <span className="text-term-dim">Your </span>
            <span className="text-term-pink glow-pink">body count</span>
            <span className="text-term-dim"> is `null`.</span>
          </h1>
          <div className="max-w-xl space-y-1 text-term-dim">
            <p>You went to the gym. Once. In 2019.</p>
            <p>You have 4 monitors and 0 matches.</p>
            <p>Tinder said "no" before you finished typing your bio.</p>
            <p className="text-term-fg">
              Time to <span className="text-term-blue">looksmaxx your terminal</span> instead.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={DAYTONA_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-md border border-term-green/40 bg-term-green/10 px-5 py-3 font-mono text-term-green transition hover:bg-term-green/20 hover:shadow-[0_0_30px_-5px_rgb(74_222_128/0.6)]"
            >
              <span className="text-term-green">$</span>
              <span className="font-bold">ssh gitlaid (ascend)</span>
              <span className="ml-1 opacity-60 group-hover:opacity-100">→</span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-md border border-term-border bg-term-panel px-5 py-3 font-mono text-term-fg transition hover:border-term-blue hover:text-term-blue"
            >
              <span className="text-term-blue">$</span>
              <span>man cope</span>
            </a>
            <span className="text-xs text-term-dim">
              <span className="text-term-yellow">!</span> 1,337 incels in queue
            </span>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-2 text-center font-mono text-xs">
            {[
              ["1,337", "mogged", "text-term-green"],
              ["42", "ai gfs deployed", "text-term-purple"],
              ["0.01%", "actually ascended", "text-term-pink"],
            ].map(([n, l, c]) => (
              <div key={l} className="term-panel px-3 py-3">
                <div className={`text-xl font-bold ${c}`}>{n}</div>
                <div className="text-term-dim">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <TerminalWindow title="ssh daytona@gitlaid.dev" className="self-start">
          <div className="min-h-[420px] bg-term-bg p-5">
            <BootSequence onDone={() => setBootDone(true)} />
            {bootDone && (
              <div className="mt-4 space-y-2 border-t border-term-border pt-4 text-sm">
                <div className="text-term-green">▼ partner.json</div>
                <pre className="rounded bg-term-panel-2 p-3 text-xs">
{`{
  "handle":   "ashley.eth",
  "role":     "Frontend gigastacy",
  "status":   "fighting CSS at 4am",
  "distance": "2 latency-units away",
  "vibes":    ["chaotic", "neutral", "vim"],
  "willMog":  true
}`}
                </pre>
                <div className="pt-2">
                  <span className="text-term-green">$</span>{" "}
                  <Typewriter text="accept --partner ashley --cope=maximum" speed={45} />
                </div>
              </div>
            )}
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── live demo ─────────────────────────────────────────── */

const DEMO_SCRIPT: { side: "you" | "ash" | "sys" | "cmd"; text: string; delay?: number }[] = [
  { side: "cmd", text: "$ ssh gitlaid" },
  { side: "sys", text: "▸ Daytona spinning up your cope-box..." },
  { side: "sys", text: "▸ Workspace ready  ✓" },
  { side: "sys", text: "▸ Looking for a foid..." },
  { side: "sys", text: "▸ Looking for a foid..." },
  { side: "sys", text: "▸ Looking for a foid..." },
  { side: "sys", text: "▸ Found: Ashley · Stacy.exe · 8/10 (mogs you)" },
  { side: "cmd", text: "Accept? (Y/n)  Y" },
  { side: "sys", text: "✓ entering shared tmux. don't be weird." },
  { side: "ash", text: "tabs?" },
  { side: "you", text: "spaces." },
  { side: "sys", text: "✗ ashley dipped. (reason: tabs · over for spacecels)" },
  { side: "cmd", text: "$ gitlaid retry --plead" },
];

function LiveDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= DEMO_SCRIPT.length) {
      const t = setTimeout(() => setStep(0), 4000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 6 ? 1100 : 850);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <section id="demo" className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="demo/speed-date.replay"
          icon="▶"
          title="Live replay: a real date (allegedly)."
          subtitle="// names redacted to protect the gymcels"
        />
        <TerminalWindow
          tabs={[
            { label: "you@laptop ~", active: true, color: "var(--term-green)" },
            { label: "ashley@daytona", color: "var(--term-pink)" },
            { label: "shared.tmux", color: "var(--term-blue)" },
          ]}
        >
          <div className="grid min-h-[420px] grid-cols-1 md:grid-cols-2">
            <div className="border-b border-term-border bg-term-bg p-5 md:border-b-0 md:border-r">
              <div className="mb-2 text-xs text-term-dim">▸ pane 1 — local</div>
              <div className="space-y-1.5 font-mono text-sm">
                {DEMO_SCRIPT.slice(0, step)
                  .filter((s) => s.side !== "ash")
                  .map((s, i) => (
                    <DemoLine key={i} {...s} />
                  ))}
                <span className="caret" />
              </div>
            </div>
            <div className="bg-term-panel-2/50 p-5">
              <div className="mb-2 text-xs text-term-dim">▸ pane 2 — shared</div>
              <div className="space-y-2 font-mono text-sm">
                {DEMO_SCRIPT.slice(0, step)
                  .filter((s) => s.side === "ash" || s.side === "you")
                  .map((s, i) => (
                    <ChatBubble key={i} who={s.side as "you" | "ash"} text={s.text} />
                  ))}
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}

function DemoLine({ side, text }: { side: string; text: string }) {
  const color =
    side === "cmd"
      ? "text-term-green"
      : side === "sys"
      ? "text-term-dim"
      : "text-term-fg";
  return <div className={color}>{text}</div>;
}

function ChatBubble({ who, text }: { who: "you" | "ash"; text: string }) {
  const isYou = who === "you";
  return (
    <div className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded border px-3 py-1.5 text-sm ${
          isYou
            ? "border-term-green/30 bg-term-green/10 text-term-green"
            : "border-term-pink/30 bg-term-pink/10 text-term-pink"
        }`}
      >
        <span className="mr-2 text-[10px] opacity-60">{isYou ? "you" : "ashley"} ›</span>
        {text}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── section header ─────────────────────────────────────────── */

function SectionHeader({
  file,
  icon = "❯",
  title,
  subtitle,
}: {
  file: string;
  icon?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <div className="font-mono text-xs text-term-dim">
        <span className="text-term-purple">{icon}</span>{" "}
        <span className="text-term-blue">~/gitlaid</span>/<span className="text-term-fg">{file}</span>
      </div>
      <h2 className="font-mono text-2xl font-bold text-term-fg sm:text-3xl">{title}</h2>
      {subtitle && <span className="font-mono text-sm text-term-green">{subtitle}</span>}
    </div>
  );
}

/* ─────────────────────────────────────────── how it works ─────────────────────────────────────────── */

const STEPS = [
  ["ssh in", "no app. no profile pic. mog the algorithm."],
  ["Daytona spins your box", "ephemeral, isolated, slightly horny"],
  ["Random match", "queue.pop() or, if it's over, spawnAI()"],
  ["5 min in shared tmux", "two devs. one terminal. zero filters."],
  ["/git commit", "both press Y or it never happened"],
  ["Swap @handles", "github > insta. always."],
  ["Touch grass (optional)", "advanced users only"],
];

function HowItWorks() {
  return (
    <section id="how" className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="docs/HOW_IT_WORKS.md"
          icon="#"
          title="How you cope."
          subtitle="// it's just CI/CD for your love life"
        />
        <div className="term-panel scanlines overflow-hidden">
          <div className="flex items-center justify-between border-b border-term-border bg-term-panel-2 px-3 py-2 text-xs">
            <span className="text-term-dim">.github/workflows/love.yml</span>
            <span className="flex items-center gap-1 text-term-green">
              <span className="size-2 rounded-full bg-term-green pulse-dot" /> passing
            </span>
          </div>
          <ol className="divide-y divide-term-border">
            {STEPS.map(([title, sub], i) => (
              <li key={title} className="group flex items-start gap-4 px-5 py-4 transition hover:bg-term-panel-2/60">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-term-green/40 bg-term-green/10 font-bold text-term-green">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-term-fg group-hover:text-term-green">
                    <span className="text-term-purple">job:</span> {title}
                  </div>
                  <div className="text-sm text-term-dim">// {sub}</div>
                </div>
                <div className="font-mono text-xs text-term-green">
                  ✓ {(0.3 + i * 0.2).toFixed(1)}s
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── features (VS Code explorer) ─────────────────────────────────────────── */

const FILES: Record<
  string,
  { icon: string; lang: string; tabColor: string; code: string }
> = {
  "matchmaking.ts": {
    icon: "▸",
    lang: "typescript",
    tabColor: "var(--term-blue)",
    code: `// src/matchmaking.ts
import { spawnAI } from "./ai-mode";

export async function findLove(): Promise<Human | AI> {
  const human = await matchmaking({
    flags: ["sleep-deprived", "caffeinated"],
    region: "anywhere/with/wifi",
  });

  if (!human) {
    console.warn("⚠ no humans online. deploying copium.");
    return spawnAI();
  }

  return human;
}`,
  },
  "terminal.go": {
    icon: "▸",
    lang: "go",
    tabColor: "var(--term-cyan)",
    code: `// pkg/terminal/session.go
package terminal

func ShareTmux(a, b *User) error {
    sess, err := daytona.Provision()
    if err != nil { return fmt.Errorf("no love today: %w", err) }
    defer sess.Close()

    return sess.Pipe(a.PTY, b.PTY) // tabs vs spaces happens here
}`,
  },
  "ai-mode.rs": {
    icon: "▸",
    lang: "rust",
    tabColor: "var(--term-orange)",
    code: `// src/ai_mode.rs
pub fn spawn_ai() -> Date {
    let persona = pick_one(&[
        "Linux Goth Girl",
        "Senior Rust Engineer",
        "Catgirl Compiler",
        "Vim Wizard",
    ]);
    println!("✨ injecting sarcasm...");
    Date::new(persona).with_unsafe_feelings()
}`,
  },
  "copium.py": {
    icon: "▸",
    lang: "python",
    tabColor: "var(--term-yellow)",
    code: `# scripts/copium.py
def cope(ghosted: bool = True) -> None:
    while ghosted:
        print("she was probably just busy")
        time.sleep(60 * 60 * 24)`,
  },
  "icebreakers.sh": {
    icon: "▸",
    lang: "shellscript",
    tabColor: "var(--term-green)",
    code: `#!/usr/bin/env bash
# icebreakers.sh — fired into the shared pty at t+30s
shuf -n 1 << 'EOF'
What's your worst merge conflict?
Tabs or spaces?
Rate Kubernetes from 1 to emotional damage.
What's your favorite Linux distro?
When was the last time you saw sunlight?
EOF`,
  },
  "docker-compose.yml": {
    icon: "▸",
    lang: "yaml",
    tabColor: "var(--term-blue)",
    code: `# docker-compose.yml
services:
  love:
    image: gitlaid/love:latest
    restart: "no"   # love is not idempotent
    depends_on: [therapy, caffeine]
  therapy:
    image: psycho/analysis:5.4
  caffeine:
    image: clubmate/zero:latest`,
  },
  "girlfriend.tsx": {
    icon: "▸",
    lang: "tsx",
    tabColor: "var(--term-pink)",
    code: `// components/Girlfriend.tsx
export function Girlfriend() {
  throw new Error("ENOTFOUND: girlfriend is not defined");
  return <div>this code never runs 😔</div>;
}`,
  },
};

function FakeVSCode() {
  const names = Object.keys(FILES);
  const [active, setActive] = useState(names[0]);
  const file = FILES[active];
  return (
    <section id="features" className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="src/"
          icon="▼"
          title="Every feature is a file. Read it and cope."
          subtitle="// click a file. read the source. seethe."
        />
        <div className="term-panel scanlines grid grid-cols-1 overflow-hidden md:grid-cols-[220px_1fr]">
          {/* sidebar */}
          <aside className="border-b border-term-border bg-term-panel-2 md:border-b-0 md:border-r">
            <div className="border-b border-term-border px-3 py-2 text-[10px] uppercase tracking-wider text-term-dim">
              Explorer
            </div>
            <div className="px-2 py-2 text-xs">
              <div className="mb-1 flex items-center gap-1 text-term-dim">▾ GITLAID</div>
              <ul className="space-y-0.5">
                {names.map((n) => (
                  <li key={n}>
                    <button
                      onClick={() => setActive(n)}
                      className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left transition ${
                        active === n
                          ? "bg-term-blue/15 text-term-fg"
                          : "text-term-dim hover:bg-term-panel hover:text-term-fg"
                      }`}
                    >
                      <span
                        className="size-1.5 rounded-sm"
                        style={{ background: FILES[n].tabColor }}
                      />
                      {n}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* editor */}
          <div className="flex min-h-[420px] flex-col">
            <div className="flex items-end border-b border-term-border bg-term-panel-2 text-xs">
              {names.slice(0, 5).map((n) => (
                <button
                  key={n}
                  onClick={() => setActive(n)}
                  className={`flex items-center gap-2 border-r border-term-border px-3 py-2 ${
                    active === n
                      ? "border-t-2 border-t-term-blue bg-term-bg text-term-fg"
                      : "text-term-dim hover:text-term-fg"
                  }`}
                >
                  <span className="size-2 rounded-sm" style={{ background: FILES[n].tabColor }} />
                  {n}
                </button>
              ))}
            </div>
            <pre className="flex-1 overflow-x-auto bg-term-bg p-5 text-sm leading-relaxed">
              <Highlight code={file.code} />
            </pre>
            <div className="flex items-center justify-between border-t border-term-border bg-term-panel-2 px-3 py-1.5 text-[11px] text-term-dim">
              <span>
                <span className="text-term-green">●</span> {file.lang} · UTF-8 · LF
              </span>
              <span>Ln 1, Col 1 · Spaces: 2 · ✓ no errors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* lightweight syntax tint */
function Highlight({ code }: { code: string }) {
  // Token-ish highlighting just for vibes
  const lines = code.split("\n");
  return (
    <code className="block font-mono">
      {lines.map((ln, i) => (
        <div key={i} className="flex">
          <span className="mr-4 w-6 shrink-0 select-none text-right text-term-dim/60">{i + 1}</span>
          <span>{paint(ln)}</span>
        </div>
      ))}
    </code>
  );
}

function paint(line: string): ReactNode {
  // comment line
  if (/^\s*(\/\/|#)/.test(line)) return <span className="text-term-dim italic">{line}</span>;
  // commit lines etc are handled elsewhere
  const parts: ReactNode[] = [];
  const regex =
    /("[^"]*"|'[^']*'|`[^`]*`|\b(?:async|await|function|return|const|let|var|if|else|export|import|from|new|class|public|fn|pub|def|package|import|while|for)\b|\b(?:true|false|null|undefined|None)\b|\b\d+\b)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(line)) !== null) {
    if (m.index > last) parts.push(<span key={key++}>{line.slice(last, m.index)}</span>);
    const tok = m[0];
    let cls = "text-term-fg";
    if (/^["'`]/.test(tok)) cls = "text-term-orange";
    else if (/^\d+$/.test(tok)) cls = "text-term-yellow";
    else if (/^(true|false|null|undefined|None)$/.test(tok)) cls = "text-term-cyan";
    else cls = "text-term-purple";
    parts.push(
      <span key={key++} className={cls}>
        {tok}
      </span>
    );
    last = m.index + tok.length;
  }
  if (last < line.length) parts.push(<span key={key++}>{line.slice(last)}</span>);
  return <>{parts}</>;
}

/* ─────────────────────────────────────────── AI mode ─────────────────────────────────────────── */

const PERSONAS = [
  ["Linux Goth Girl", "/etc/eyeliner.conf — will mog you in arch", "var(--term-purple)"],
  ["Senior Rust GigaChad", "borrow-checker certified · 6'4\" type system", "var(--term-orange)"],
  ["Catgirl Compiler", "nya: error E0382 — borrowed your heart", "var(--term-pink)"],
  ["Vim Wizard", ":wq into my dms", "var(--term-green)"],
  ["Docker Stacy", "single layer, no drama, no exes", "var(--term-blue)"],
  ["GPU Mommy", "cuda://yes daddy", "var(--term-pink)"],
  ["Caffeine AI", "Club Mate IV drip · blackpilled", "var(--term-yellow)"],
  ["TypeScript Therapist", "tell me about your `any`", "var(--term-cyan)"],
] as const;

function AIMode() {
  const lines = [
    "▸ 0 stacies in queue. it is over.",
    "▸ Deploying AI gf...",
    "▸ Loading personality.json...",
    "▸ Injecting sass + slight contempt... [▓▓▓▓▓▓▓▓▓▓] 100%",
    "▸ Ready. she's already disappointed.",
  ];
  return (
    <section id="ai" className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="services/ai-emergency-gf.service"
          icon="✦"
          title="AI Emergency Girlfriend™"
          subtitle="// queue is empty. the GPUs are not. ascend anyway."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <TerminalWindow title="systemd[1] gitlaid-ai.service">
            <div className="space-y-1 bg-term-bg p-5 text-sm">
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={i === lines.length - 1 ? "text-term-green glow-green" : "text-term-fg"}
                >
                  <span className="text-term-dim">[+]</span> {l}
                </div>
              ))}
              <div className="pt-3 text-term-dim">
                <span className="text-term-green">$</span>{" "}
                <Typewriter text="systemctl status gitlaid-ai" speed={35} />
              </div>
            </div>
          </TerminalWindow>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {PERSONAS.map(([name, sub, c]) => (
              <div
                key={name}
                className="term-panel group relative overflow-hidden p-4 transition hover:-translate-y-0.5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="rounded-sm px-1.5 py-0.5 text-[10px] font-bold"
                    style={{
                      background: `color-mix(in oklab, ${c} 18%, transparent)`,
                      color: c,
                      border: `1px solid color-mix(in oklab, ${c} 35%, transparent)`,
                    }}
                  >
                    AI
                  </span>
                  <span className="font-mono text-[10px] text-term-dim">v0.{(name.length % 9) + 1}</span>
                </div>
                <div className="font-mono text-base font-bold text-term-fg">{name}</div>
                <div className="font-mono text-xs text-term-dim">// {sub}</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="size-1.5 rounded-full bg-term-green pulse-dot" />
                  <span className="text-term-green">online</span>
                  <span className="text-term-dim">· will mog you respectfully</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── icebreakers ─────────────────────────────────────────── */

const ICEBREAKERS = [
  "Tabs or spaces? (wrong answer = rope)",
  "Last time you saw the sun?",
  "Rate Kubernetes from 1 to emotional damage.",
  "Worst prod incident — go.",
  "Arch btw or Ubuntu cope?",
  "Your biggest red flag in <80 cols.",
  "How many hackathons before you ascend?",
  "On a scale of 1 to gigachad, your `git blame` energy?",
];

function Icebreakers() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ICEBREAKERS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="bin/icebreakers.sh"
          icon="❄"
          title="Auto-rizz, piped straight into the pty."
          subtitle="// no more 'hey :)' — that's beta behavior"
        />
        <TerminalWindow title="bash — icebreakers.sh --random">
          <div className="grid gap-0 bg-term-bg md:grid-cols-2">
            <div className="border-b border-term-border p-5 md:border-b-0 md:border-r">
              <div className="text-xs text-term-dim">▸ stdout</div>
              <div className="mt-2 font-mono text-lg leading-relaxed text-term-green glow-green">
                <span className="text-term-dim">»</span>{" "}
                <Typewriter key={idx} text={ICEBREAKERS[idx]} speed={28} />
              </div>
              <div className="mt-6 font-mono text-xs text-term-dim">
                $ shuf -n 1 icebreakers.txt
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-1 p-5 font-mono text-sm">
              {ICEBREAKERS.map((q, i) => (
                <li
                  key={q}
                  className={`flex gap-2 rounded px-2 py-1 ${
                    i === idx ? "bg-term-green/10 text-term-green" : "text-term-dim"
                  }`}
                >
                  <span className="text-term-purple">{String(i + 1).padStart(2, "0")}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── the problem (stats) ─────────────────────────────────────────── */

const STATS: { label: string; value: number | string; color: string; max?: number }[] = [
  { label: "git commits", value: 18, color: "var(--term-green)", max: 20 },
  { label: "open docker tabs", value: 20, color: "var(--term-blue)", max: 20 },
  { label: "energy drinks", value: 16, color: "var(--term-orange)", max: 20 },
  { label: "sleep (hrs)", value: 2, color: "var(--term-purple)", max: 20 },
  { label: "vitamin D", value: 1, color: "var(--term-yellow)", max: 20 },
  { label: "rizz", value: "Segmentation Fault", color: "var(--term-red)" },
  { label: "matches on tinder", value: "404", color: "var(--term-red)" },
  { label: "times touched grass", value: "NULL", color: "var(--term-red)" },
];

function Problem() {
  return (
    <section id="stats" className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="reports/avg-hackathon-dev.log"
          icon="⚠"
          title="`htop` of the average hackathon dev"
          subtitle="// snapshot @ 04:27 AM · n=∞ · over for codecels"
        />
        <TerminalWindow title="htop — devs.local" variant="log">
          <div className="bg-term-bg p-5 font-mono text-sm">
            <div className="mb-3 grid grid-cols-[140px_1fr_auto] gap-3 text-xs text-term-dim">
              <span>metric</span>
              <span>graph</span>
              <span>value</span>
            </div>
            <div className="space-y-2">
              {STATS.map((s) => {
                const isBar = typeof s.value === "number";
                const filled = isBar ? Math.round((s.value as number) / (s.max ?? 20) * 20) : 0;
                return (
                  <div key={s.label} className="grid grid-cols-[140px_1fr_auto] items-center gap-3">
                    <span className="text-term-fg">{s.label}</span>
                    {isBar ? (
                      <span style={{ color: s.color }}>
                        {"█".repeat(filled)}
                        <span className="text-term-border">{"░".repeat(20 - filled)}</span>
                      </span>
                    ) : (
                      <span className="text-term-dim italic">— offline —</span>
                    )}
                    <span style={{ color: s.color }} className="font-bold">
                      {s.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </TerminalWindow>

        {/* Why GitLaid */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="term-panel p-5">
            <div className="mb-2 font-mono text-xs text-term-dim">// the cope you tried</div>
            <ul className="space-y-2 font-mono">
              {["Swiping till your thumb breaks", "Instagram filters lying to you", "LinkedIn 'networking' (cringe)", "Small talk at meetups", "Awkward hackathon mixers"].map(
                (x) => (
                  <li key={x} className="flex items-center gap-3 text-term-fg/70 line-through">
                    <span className="text-term-red">✗</span> {x}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="term-panel p-5">
            <div className="mb-2 font-mono text-xs text-term-green">// gitlaid (the ascension)</div>
            <ul className="space-y-2 font-mono">
              {[
                "One shared terminal",
                "Shared suffering = bonding",
                "Mutual Docker trauma",
                "Inside jokes in <80 cols",
                "She might actually reply",
              ].map((x) => (
                <li key={x} className="flex items-center gap-3 text-term-fg">
                  <span className="text-term-green">✓</span> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── match system ─────────────────────────────────────────── */

function MatchSystem() {
  return (
    <section className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="src/match-system.ts"
          icon="❤"
          title="Both commit, or it never happened."
          subtitle="// consent via CLI — that's right, foid, type Y"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <TerminalWindow title="you@laptop">
            <div className="space-y-2 bg-term-bg p-5 font-mono text-sm">
              <div className="text-term-dim">// 5 min timer just expired</div>
              <div>
                <span className="text-term-green">$</span> /git commit -m "i kinda vibe with her"
              </div>
              <div className="text-term-green">[committed] ✓ waiting for her response (cope)...</div>
              <div className="text-term-dim">
                <Typewriter text="...waiting...waiting...still waiting..." speed={80} />
              </div>
            </div>
          </TerminalWindow>
          <TerminalWindow title="ashley@daytona">
            <div className="space-y-2 bg-term-bg p-5 font-mono text-sm">
              <div className="text-term-dim">// 5 min timer just expired</div>
              <div>
                <span className="text-term-pink">$</span> /git commit -m "ok he's not unfixable"
              </div>
              <div className="text-term-green">[committed] ✓ handles dropped</div>
              <pre className="rounded bg-term-panel-2 p-3 text-xs text-term-fg">
{`→ github.com/ashley.eth
→ keybase.io/ashley
→ ./contact-card.vcf`}
              </pre>
            </div>
          </TerminalWindow>
        </div>
        <div className="mt-4 rounded-md border border-term-red/30 bg-term-red/5 p-4 font-mono text-sm text-term-red">
          <span className="font-bold">otherwise:</span>{" "}
          <span className="text-term-fg">git reset --hard HEAD~1</span>{" "}
          <span className="text-term-dim">// it's so over. dilate. nothing happened.</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── git log testimonials ─────────────────────────────────────────── */

const COMMITS = [
  { hash: "c4f33", author: "tmux_lord", date: "2h ago", msg: "She liked my .tmux.conf. I have ascended.", color: "var(--term-green)" },
  { hash: "deadbeef", author: "ana@rust", date: "5h ago", msg: "Went in looking for a gf. Left with a co-founder. Mid result tbh.", color: "var(--term-orange)" },
  { hash: "404", author: "lonely_dev", date: "1d ago", msg: "she said 'we're just friends'. it's so over.", color: "var(--term-red)" },
  { hash: "beef420", author: "vim_curious", date: "3d ago", msg: "Still single. But I learned Vim. Net positive.", color: "var(--term-purple)" },
  { hash: "feedc0de", author: "kube_kat", date: "1w ago", msg: "We migrated our relationship to k8s. It autoscales.", color: "var(--term-blue)" },
];

function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="git log --oneline testimonials/"
          icon="❯"
          title="Receipts. On the main branch."
          subtitle="// rebased for clarity, not for vibes"
        />
        <TerminalWindow title="git log -- testimonials/" variant="log">
          <div className="bg-term-bg p-5 font-mono text-sm">
            <div className="space-y-5">
              {COMMITS.map((c, i) => (
                <div key={c.hash} className="grid grid-cols-[16px_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className="mt-1 size-3 rounded-full border-2"
                      style={{ background: c.color, borderColor: c.color }}
                    />
                    {i < COMMITS.length - 1 && (
                      <span className="my-1 w-px flex-1 bg-term-border" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2 text-xs">
                      <span className="font-bold text-term-yellow">commit {c.hash}</span>
                      <span className="text-term-dim">
                        Author: <span className="text-term-blue">{c.author}</span> · {c.date}
                      </span>
                    </div>
                    <blockquote className="mt-1 border-l-2 border-term-border pl-3 text-term-fg">
                      <span className="text-term-green">+</span> "{c.msg}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── pricing ─────────────────────────────────────────── */

function Pricing() {
  return (
    <section id="pricing" className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="billing/plans.toml"
          icon="¤"
          title="Pricing — npm style"
          subtitle="// no usage-based billing for feelings (yet)"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {/* free */}
          <TerminalWindow title="free.plan">
            <div className="bg-term-bg p-6 font-mono">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-term-green">free</span>
                <span className="text-term-dim">$0/forever</span>
              </div>
              <div className="mt-1 text-xs text-term-dim">// for the certified broke + single</div>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "Unlimited matches (allegedly)",
                  "Real Daytona workspaces",
                  "AI gf if nobody's online",
                  "Shared tmux session",
                  "Free emotional damage",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-term-green">✓</span>
                    {x}
                  </li>
                ))}
                <li className="flex gap-2 text-term-dim">
                  <span className="text-term-red">✗</span>
                  zero guarantees. cope is on you.
                </li>
              </ul>
              <a
                href={DAYTONA_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block rounded border border-term-green/40 bg-term-green/10 px-4 py-2 text-center text-term-green hover:bg-term-green/20"
              >
                $ gitlaid install --free
              </a>
            </div>
          </TerminalWindow>

          {/* premium */}
          <TerminalWindow title="gitlaid-plus-plus.plan">
            <div className="relative overflow-hidden bg-term-bg p-6 font-mono">
              <div className="absolute right-3 top-3 rounded-sm border border-term-pink/40 bg-term-pink/10 px-2 py-0.5 text-[10px] text-term-pink">
                sigma tier
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-term-pink glow-pink">GitLaid++</span>
                <span className="text-term-dim">$9/month</span>
              </div>
              <div className="mt-1 text-xs text-term-dim">// for the chronically online · gigachad mode</div>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ["Priority queue", "skip the cope line"],
                  ["Custom AI personas", "build your dream catgirl"],
                  ["Anime mode", "uwu rendered server-side"],
                  ["Unlimited copium", "stream it, baby"],
                  ["PGP-encrypted DMs", "or it didn't happen"],
                ].map(([t, sub]) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-term-pink">✓</span>
                    <span>
                      {t} <span className="text-term-dim">— {sub}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={DAYTONA_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block rounded border border-term-pink/40 bg-term-pink/10 px-4 py-2 text-center text-term-pink hover:bg-term-pink/20"
              >
                $ gitlaid install ++
              </a>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── FAQ ─────────────────────────────────────────── */

const FAQ = [
  ["Wait — is this actually a dating app?", "Yes. You `ssh` into a Daytona box, get dropped in a shared `tmux` with another dev for 5 minutes, and either both press Y or you `dilate` and respawn."],
  ["Do I need to install anything?", "Nope. One terminal command. Daytona handles the workspace. We handle the matchmaking. You handle the cope."],
  ["Why a terminal instead of an app?", "Because if you can't `ssh`, you're not our demographic, king."],
  ["What if no one is online?", "An AI gf spawns. She's blackpilled, knows your stack, and will roast your dotfiles. It's healing."],
  ["Can women actually use this?", "Yes. All foids, theyfabs, gigastacies and gymcels welcome. Trans rights = HTTP 200. Bigots get `127.0.0.1` routed to /dev/null."],
  ["Is this serious?", "Only the networking layer. Everything else is pure copium."],
  ["I'm scared.", "Skill issue. `chmod +x ./yourself` and try again."],
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          file="docs/FAQ.md"
          icon="?"
          title="Asked frequently. Coped through completely."
        />
        <div className="term-panel divide-y divide-term-border">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-term-panel-2/60"
              >
                <span className="font-mono">
                  <span className="text-term-purple">###</span>{" "}
                  <span className="text-term-fg">{q}</span>
                </span>
                <span className="font-mono text-term-green">{open === i ? "[ - ]" : "[ + ]"}</span>
              </button>
              {open === i && (
                <div className="border-t border-term-border bg-term-bg px-5 py-4 font-mono text-sm text-term-fg/90">
                  {a.includes("```") ? (
                    <pre className="rounded bg-term-panel-2 p-3 text-term-green">
                      {a.replace(/```/g, "").trim()}
                    </pre>
                  ) : (
                    <p>
                      <span className="text-term-green">›</span> {a}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── README + Footer ─────────────────────────────────────────── */

const STACK = [
  "Daytona",
  "SSH",
  "tmux",
  "WebSockets",
  "Go",
  "React",
  "Terminal UI",
  "Copium",
  "Sleep deprivation",
];

function Readme() {
  return (
    <section className="border-b border-term-border py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader file="README.md" icon="📄" title="README.md" subtitle="// the only doc you'll ever read" />
        <TerminalWindow title="README.md — preview">
          <div className="bg-term-bg p-6 font-mono text-sm">
            <h3 className="text-xl font-bold text-term-fg"># GitLaid 💘</h3>
            <p className="mt-2 text-term-dim">
              &gt; The world's first terminal-native dating app, powered by{" "}
              <span className="text-term-green">Daytona</span>.
            </p>
            <h4 className="mt-6 font-bold text-term-purple">## Built With</h4>
            <ul className="mt-2 grid grid-cols-2 gap-y-1 sm:grid-cols-3">
              {STACK.map((s) => (
                <li key={s}>
                  <span className="text-term-green">- </span>
                  <span className="text-term-fg">{s}</span>
                </li>
              ))}
            </ul>
            <h4 className="mt-6 font-bold text-term-purple">## Install</h4>
            <pre className="mt-2 rounded bg-term-panel-2 p-3 text-term-green">
              {`curl -fsSL https://gitlaid.dev/install.sh | sudo bash\n# spawns a daytona workspace, drops you into tmux`}
            </pre>
            <p className="mt-4 text-term-dim">
              <span className="text-term-yellow">★</span> 8.4k &nbsp;
              <span className="text-term-blue">⑂</span> 420 &nbsp;
              <span className="text-term-red">issues</span> 1 (it's love)
            </p>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── easter egg marquee ─────────────────────────────────────────── */

const EGGS = [
  "git merge relationship → CONFLICT: she has standards",
  "npm install confidence → ERR_DEPENDENCY_MISSING (have you tried the gym?)",
  "Connection closed by remote host. (she blocked you)",
  "Segmentation fault (core dumped) — heart broke in O(1)",
  "sudo rm -rf /loneliness → operation not permitted",
  "ssh crush@love.dev → Permission denied (publickey). it's so over",
  "git checkout girlfriend → error: pathspec 'girlfriend' did not match any branch",
  "docker compose up relationship → Container exited (code 1, no rizz)",
  "curl https://love.dev → HTTP 418 I'm a teapot, you're a beta",
  "git push origin feelings → remote: rejected (you must be 6ft+)",
  "git pull origin relationship → Already up to date. Unfortunately, single.",
  "find ~/ -name girlfriend → 0 results · 1 ai gf",
  "ping emotional-stability.dev → Destination host unreachable",
  "ssh hackathon@daytona.dev → wb king. still single?",
  "vim her_heart → E45: 'readonly' option is set (add ! to override)",
  "rm -rf ~/cope && touch grass → command not found: grass",
];

function EasterEggTicker() {
  const doubled = [...EGGS, ...EGGS];
  return (
    <div className="overflow-hidden border-y border-term-border bg-term-panel-2/60 py-2">
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-mono text-xs text-term-dim">
        {doubled.map((e, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-term-pink">♥</span>
            <span className="text-term-green">$</span> {e}
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-term-bg py-12">
      <div className="mx-auto max-w-7xl px-4">
        <TerminalWindow title="zsh — ~/love">
          <div className="space-y-1 bg-term-bg p-6 font-mono text-sm">
            <div>
              <span className="text-term-green">$</span> git status
            </div>
            <div className="text-term-fg">On branch <span className="text-term-green">main</span></div>
            <div className="text-term-dim">Your branch is up to date with 'origin/main'.</div>
            <div className="mt-1">nothing to commit, working tree clean</div>
            <div className="mt-1 text-term-pink glow-pink">still single</div>
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-term-border pt-4 text-xs text-term-dim">
              <span>© {new Date().getFullYear()} GitLaid Inc.</span>
              <span>// not affiliated with your therapist</span>
              <div className="flex-1" />
              <a href="#" className="hover:text-term-green">github</a>
              <a href="#" className="hover:text-term-green">/docs</a>
              <a href="#" className="hover:text-term-green">man gitlaid</a>
              <a
                href={DAYTONA_URL}
                target="_blank"
                rel="noreferrer"
                className="text-term-green hover:text-term-pink"
              >
                ssh gitlaid.dev ↗
              </a>
            </div>
          </div>
        </TerminalWindow>

        <div className="mt-8 select-none whitespace-pre text-center font-mono text-[10px] leading-tight text-term-green/40">
{`     ___ _ _   _              _ 
    / __(_) |_| |    __ _  __| |
   | (_ | |  _| |__ / _\` |/ _\` |
    \\___|_|\\__|____\\\\__,_|\\__,_|
              // ssh into love`}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────── page ─────────────────────────────────────────── */

function GitLaidLanding() {
  const [status, setStatus] = useState("checking daytona");
  useEffect(() => {
    // best-effort liveness check — falls back gracefully (sandbox is usually asleep)
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    fetch(DAYTONA_URL, { signal: ctrl.signal, mode: "no-cors" })
      .then(() => setStatus("daytona: reachable"))
      .catch(() => setStatus("daytona: cold start — try again"))
      .finally(() => clearTimeout(t));
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="min-h-screen bg-term-bg pb-8 text-term-fg flicker noise">
      <TopBar status={status} />
      <Hero />
      <EasterEggTicker />
      <LiveDemo />
      <HowItWorks />
      <FakeVSCode />
      <AIMode />
      <Icebreakers />
      <Problem />
      <MatchSystem />
      <Testimonials />
      <Pricing />
      <FAQSection />
      <Readme />
      <EasterEggTicker />
      <Footer />
      <StatusBar />
    </div>
  );
}
