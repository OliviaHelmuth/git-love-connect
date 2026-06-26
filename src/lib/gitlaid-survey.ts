// Fallback question deck (from the GitCommitted street survey).
// Used when the live Daytona WebSocket/REST session can't be established.

export type SurveyQuestion = {
  id: string;
  tag: string;
  prompt: string;
  type: "single" | "multi" | "scale" | "open";
  options?: string[];
  hint?: string;
};

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: "q1",
    tag: "Q1 · screener",
    prompt:
      "do you write code, design products, or build things with tech (even as a hobby)?",
    type: "single",
    options: ["yes, regularly", "sometimes / learning", "no"],
  },
  {
    id: "q2",
    tag: "Q2 · events",
    prompt: "have you ever gone to a hackathon, dev meetup, or builder event?",
    type: "single",
    options: [
      "yes, in the last 6 months",
      "yes, but not recently",
      "never, but i'd try",
      "never, not interested",
    ],
  },
  {
    id: "q3",
    tag: "Q3 · problem",
    prompt: "when you need a teammate, what's hardest? (pick up to 2)",
    type: "multi",
    options: [
      "finding the right skills",
      "finding someone who matches my vibe",
      "breaking the ice with strangers",
      "trusting they'll actually ship",
      "not a problem for me",
    ],
    hint: "comma-separated numbers, e.g. 1,3",
  },
  {
    id: "q4",
    tag: "Q4 · today",
    prompt: "how do you usually find people to build with today?",
    type: "multi",
    options: [
      "friends / existing network",
      "discord / slack / online communities",
      "linkedin or job boards",
      "random pairing at the event",
      "i usually work alone",
    ],
    hint: "comma-separated numbers",
  },
  {
    id: "q5",
    tag: "Q5 · concept",
    prompt:
      "gitlaid matches you to builders with similar stack, goals, and vibe. how appealing? (1=meh, 5=ssh me in NOW)",
    type: "scale",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    id: "q6",
    tag: "Q6 · where",
    prompt: "where would you actually use this?",
    type: "multi",
    options: [
      "hackathons",
      "startup networking",
      "coworking / office",
      "casual vibecoding sessions",
      "wouldn't use it",
    ],
    hint: "comma-separated numbers",
  },
  {
    id: "q7",
    tag: "Q7 · trust",
    prompt: "what would make you trust a match from an app?",
    type: "open",
    hint: "type freely, press enter when done",
  },
  {
    id: "q8",
    tag: "Q8 · close",
    prompt:
      "would you try a 60-second profile if we sent you a link after the hackathon?",
    type: "single",
    options: ["yes, hit me up", "maybe later", "no thanks"],
  },
];

export function formatQuestion(q: SurveyQuestion): string[] {
  const lines: string[] = [];
  lines.push(`── ${q.tag} ──`);
  lines.push(q.prompt);
  if (q.options) {
    q.options.forEach((opt, i) => lines.push(`  ${i + 1}) ${opt}`));
  }
  if (q.hint) lines.push(`  (${q.hint})`);
  return lines;
}
