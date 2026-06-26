import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/presentation")({
  head: () => ({
    meta: [
      { title: "GitLaid — Hackathon Pitch" },
      { name: "description", content: "GitLaid: ssh into love. The terminal-native dating app, powered by Daytona." },
      { property: "og:title", content: "GitLaid — Hackathon Pitch" },
      { property: "og:description", content: "ssh gitlaid.dev → get matched with another dev in a shared tmux for 5 minutes. Powered by Daytona." },
    ],
  }),
  component: PresentationPage,
});

type Slide = {
  kicker: string;
  altBg?: boolean;
  body: React.ReactNode;
};

const SLIDES: Slide[] = [
  {
    kicker: "Hackathon pitch",
    altBg: true,
    body: (
      <>
        <h1>
          Git<span>Laid</span>
        </h1>
        <p className="subtitle">
          The world&apos;s first terminal-native dating app. <strong>ssh</strong> in, get matched with another dev in a shared{" "}
          <strong>tmux</strong> for 5 minutes. Powered by <strong>Daytona</strong>.
        </p>
        <div className="tags">
          <span className="tag">git clone love</span>
          <span className="tag">also considered: GitRizz</span>
        </div>
      </>
    ),
  },
  {
    kicker: "Problem",
    body: (
      <>
        <h2>Devs ship code. They don&apos;t ship feelings.</h2>
        <ul>
          <li>
            You have a 412-day GitHub streak and a <strong>body count of `null`</strong>.
          </li>
          <li>
            Dating apps want selfies and small talk. You want <strong>a shared shell</strong>.
          </li>
          <li>
            Your last romantic interaction was a Copilot suggestion you actually accepted.
          </li>
        </ul>
      </>
    ),
  },
  {
    kicker: "Who feels it",
    altBg: true,
    body: (
      <>
        <h2>Terminal-pilled, touch-grass-averse.</h2>
        <ul>
          <li><strong>Backend devs</strong> who haven&apos;t seen the sun since the last Postgres major release</li>
          <li><strong>Vim users</strong> trapped in a relationship with their config</li>
          <li><strong>Rust evangelists</strong> mogged by their own borrow checker</li>
          <li><strong>AI builders</strong> shipping agents instead of asking anyone out</li>
        </ul>
      </>
    ),
  },
  {
    kicker: "Solution",
    body: (
      <>
        <h2>GitLaid matches you in a tmux. Not on a feed.</h2>
        <p className="subtitle">
          One command. We spin up a Daytona sandbox, drop you and another dev into the same pane, and start a 5-minute timer.
          Press <strong>Y</strong> to keep the connection. Press <strong>q</strong> to cope.
        </p>
      </>
    ),
  },
  {
    kicker: "How it works",
    altBg: true,
    body: (
      <>
        <h2>Three commands. Under 60 seconds.</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h3>ssh gitlaid.dev</h3>
            <p>We fire up a fresh Daytona workspace. No app store. No selfie verification.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3>Get matched</h3>
            <p>Another human (or our AI Emergency Date™) joins your tmux. Same pane. Same vibe.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3>5 minutes to commit</h3>
            <p>Talk. Pair-program. Roast each other&apos;s `.vimrc`. Then both press Y, or `dilate`.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    kicker: "Where it fits",
    body: (
      <>
        <h2>Built for the chronically online.</h2>
        <div className="tags" style={{ marginTop: 0 }}>
          <span className="tag">Hackathons</span>
          <span className="tag">3am debugging</span>
          <span className="tag">CS dorms</span>
          <span className="tag">Remote dev loneliness</span>
          <span className="tag">DevOps team-building</span>
          <span className="tag">Conference afterparties</span>
        </div>
        <p className="subtitle" style={{ marginTop: 28 }}>
          One ssh. Same matching engine. Different `MOTD`.
        </p>
      </>
    ),
  },
  {
    kicker: "What we built",
    altBg: true,
    body: (
      <>
        <h2>MVP, shipped this weekend.</h2>
        <ul>
          <li><strong>Daytona harness</strong> that spawns a sandboxed workspace per match</li>
          <li><strong>Shared tmux session</strong> over SSH — real shell, real latency, real chemistry</li>
          <li><strong>AI Emergency Date™</strong> if no humans are online — picks from GigaChad, GPU Mommy, Linux Goth Girl</li>
          <li><strong>git log testimonials</strong>, htop-style loneliness metrics, and a CRT-flicker landing page</li>
        </ul>
      </>
    ),
  },
  {
    kicker: "Why now",
    body: (
      <>
        <div className="big-stat">98%</div>
        <p className="subtitle">
          of developers we surveyed said they&apos;d rather <strong>ssh into a girlfriend</strong> than fill out a Hinge prompt.
          (Sample size: us, at 4am, n=4.)
        </p>
      </>
    ),
  },
  {
    kicker: "Ask",
    altBg: true,
    body: (
      <>
        <h2>Try it. Then admit you needed it.</h2>
        <ul>
          <li>Open a terminal and run the curl from the landing page</li>
          <li>Get dropped into a Daytona-powered tmux with another dev</li>
          <li>Tell us how long you lasted. Free copium for the brave.</li>
        </ul>
        <a className="cta" href="/">← back to gitlaid.dev</a>
      </>
    ),
  },
  {
    kicker: "Thank you",
    body: (
      <>
        <h1>
          Let&apos;s get <span>committed</span>.
        </h1>
        <p className="subtitle">Questions? <strong>ssh</strong> us. Or just open an issue against your love life.</p>
      </>
    ),
  },
];

function PresentationPage() {
  const [i, setI] = useState(0);
  const total = SLIDES.length;

  const go = useCallback(
    (n: number) => setI(((n % total) + total) % total),
    [total],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(i + 1);
      } else if (e.key === "ArrowLeft") {
        go(i - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [i, go]);

  useEffect(() => {
    let tx = 0;
    const start = (e: TouchEvent) => {
      tx = e.touches[0].clientX;
    };
    const end = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
    };
    window.addEventListener("touchstart", start);
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [i, go]);

  return (
    <>
      <style>{CSS}</style>
      <div className="deck">
        {SLIDES.map((s, idx) => (
          <section
            key={idx}
            className={`slide ${s.altBg ? "alt-bg" : ""} ${idx === i ? "active" : ""}`}
          >
            <p className="kicker">{s.kicker}</p>
            {s.body}
          </section>
        ))}
      </div>
      <div className="footer">
        <div className="progress">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === i ? "on" : ""}`}
              onClick={() => go(idx)}
            />
          ))}
        </div>
        <span className="hint">← → or swipe · gitlaid.dev · {i + 1}/{total}</span>
      </div>
    </>
  );
}

const CSS = `
  :root {
    --black: #0a0a0a;
    --gray-900: #141414;
    --gray-700: #3a3a3a;
    --gray-500: #6b6b6b;
    --gray-300: #a3a3a3;
    --gray-100: #e8e8e8;
    --green: #39ff14;
    --green-bright: #7dff5b;
    --green-dim: rgba(57, 255, 20, 0.15);
  }
  html, body, #root {
    height: 100%;
    background: var(--black);
    color: var(--gray-100);
    font-family: "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, monospace;
    overflow: hidden;
    margin: 0;
  }
  .deck { height: 100vh; width: 100vw; position: relative; }
  .slide {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; justify-content: center;
    padding: 48px 72px;
    opacity: 0; pointer-events: none;
    transform: translateX(40px);
    transition: opacity .35s ease, transform .35s ease;
    background: var(--black);
  }
  .slide::before {
    content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, var(--green), var(--green-bright) 60%, transparent);
  }
  .slide.active { opacity: 1; pointer-events: auto; transform: translateX(0); z-index: 2; }
  .slide.alt-bg { background: linear-gradient(135deg, var(--gray-900) 0%, var(--black) 55%); }
  .kicker {
    font-size: 13px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
    color: var(--green); margin-bottom: 16px;
  }
  h1 {
    font-size: clamp(42px, 7vw, 72px); font-weight: 800; line-height: 1.05;
    letter-spacing: -0.03em; margin-bottom: 20px;
  }
  h1 span { color: var(--green-bright); }
  h2 {
    font-size: clamp(28px, 4.5vw, 44px); font-weight: 700; line-height: 1.15;
    letter-spacing: -0.02em; margin-bottom: 28px; max-width: 22ch;
  }
  .subtitle { font-size: clamp(18px, 2.2vw, 26px); color: var(--gray-300); max-width: 40ch; line-height: 1.45; }
  ul { list-style: none; display: flex; flex-direction: column; gap: 18px; max-width: 60ch; padding: 0; margin: 0; }
  li {
    font-size: clamp(18px, 2.2vw, 26px); line-height: 1.35; padding-left: 28px;
    position: relative; color: var(--gray-100);
  }
  li::before {
    content: ""; position: absolute; left: 0; top: 0.55em; width: 10px; height: 10px;
    background: var(--green); border-radius: 2px;
  }
  li strong { color: #fff; }
  .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 8px; max-width: 960px; }
  .step {
    background: var(--gray-900); border: 1px solid var(--gray-700);
    border-top: 3px solid var(--green); border-radius: 12px; padding: 24px 20px;
  }
  .step-num { font-size: 32px; font-weight: 800; color: var(--green); margin-bottom: 8px; }
  .step h3 { font-size: 20px; margin-bottom: 8px; color: #fff; }
  .step p { font-size: 15px; color: var(--gray-300); line-height: 1.45; }
  .tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .tag {
    font-size: 14px; font-weight: 600; padding: 8px 14px; border-radius: 999px;
    background: var(--green-dim); color: var(--green-bright);
    border: 1px solid rgba(57, 255, 20, 0.35);
  }
  .big-stat { font-size: clamp(56px, 10vw, 96px); font-weight: 800; color: var(--green-bright); line-height: 1; margin-bottom: 12px; }
  .cta {
    display: inline-block; margin-top: 28px; padding: 14px 28px;
    background: var(--green); color: #000; font-size: 18px; font-weight: 700;
    border-radius: 8px; text-decoration: none;
  }
  .footer {
    position: fixed; bottom: 20px; left: 72px; right: 72px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px; color: var(--gray-500); z-index: 10;
  }
  .progress { display: flex; gap: 6px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gray-700); transition: background .2s; cursor: pointer; }
  .dot.on { background: var(--green); }
  .hint { font-size: 12px; color: var(--gray-500); }
  @media (max-width: 768px) {
    .slide { padding: 32px 28px; }
    .footer { left: 28px; right: 28px; }
    .steps { grid-template-columns: 1fr; }
  }
`;
