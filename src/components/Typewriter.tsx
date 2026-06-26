import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
  className?: string;
  showCaret?: boolean;
}

export function Typewriter({
  text,
  speed = 22,
  startDelay = 0,
  onDone,
  className,
  showCaret = true,
}: TypewriterProps) {
  const [out, setOut] = useState("");
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (started) return;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [started, startDelay]);

  useEffect(() => {
    if (!started) return;
    if (out.length >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setOut(text.slice(0, out.length + 1)), speed);
    return () => clearTimeout(t);
  }, [out, text, speed, started, onDone]);

  const done = out.length >= text.length;
  return (
    <span className={className}>
      <span style={{ whiteSpace: "pre-wrap" }}>{out}</span>
      {showCaret && !done && <span className="caret" />}
    </span>
  );
}
