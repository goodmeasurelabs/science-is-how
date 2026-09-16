import { useState } from "react";
import Callout from "../../../components/Callout";
import { trackInteraction } from "../../../lib/analytics";

interface Example {
  name: string;
  degrees: number[];
  blurb: string;
}

const EXAMPLES: Example[] = [
  { name: "Königsberg, 1736", degrees: [3, 5, 3, 3], blurb: "Four odd dots." },
  { name: "A square", degrees: [2, 2, 2, 2], blurb: "Walk around the block." },
  { name: "The envelope puzzle", degrees: [3, 3, 4, 4, 2], blurb: "The house you draw without lifting your pen." },
  { name: "A five-pointed star", degrees: [4, 4, 4, 4, 4], blurb: "Every point has two lines in, two out." },
  { name: "Two triangles sharing a corner", degrees: [2, 2, 4, 2, 2], blurb: "A bow tie." },
  { name: "A cube's edges", degrees: [3, 3, 3, 3, 3, 3, 3, 3], blurb: "Eight corners, three edges each." },
];

function verdict(degrees: number[]): { odd: number; text: string; ok: boolean } {
  const odd = degrees.filter((d) => d % 2 === 1).length;
  if (odd === 0) return { odd, text: "A walk exists, and you can end where you started (a circuit).", ok: true };
  if (odd === 2) return { odd, text: "A walk exists. It must start at one odd dot and end at the other.", ok: true };
  return { odd, text: "No walk crosses every line exactly once.", ok: false };
}

export default function TheRule() {
  const [i, setI] = useState(0);
  const ex = EXAMPLES[i];
  const v = verdict(ex.degrees);
  const pick = (n: number) => {
    setI(n);
    trackInteraction({ story: "konigsberg-bridges", widget: "degree_checker", action: "pick", value: EXAMPLES[n].name });
  };
  return (
    <div className="story-prose">
      <h2>The Rule</h2>
      <p>
        Euler's argument gives a rule you can apply to any map, any drawing, any network of dots and
        lines, in seconds. Count how many dots have an odd number of lines:
      </p>
      <ul>
        <li>
          <strong>Zero odd dots:</strong> you can cross every line once and finish where you started.
        </li>
        <li>
          <strong>Exactly two odd dots:</strong> you can cross every line once, but you must start at
          one odd dot and finish at the other.
        </li>
        <li>
          <strong>Anything else:</strong> impossible. Don't bother.
        </li>
      </ul>
      <p>
        (There's one more small condition: the drawing has to be connected, all in one piece. Euler
        didn't state that part; it was tidied up by later mathematicians.)
      </p>

      <div className="my-8 rounded-3xl border border-line bg-surface-2 p-5 shadow-card">
        <p className="mb-3 text-center font-display font-bold">Degree checker</p>
        <div className="flex flex-wrap justify-center gap-2">
          {EXAMPLES.map((e, n) => (
            <button
              key={e.name}
              type="button"
              onClick={() => pick(n)}
              aria-pressed={n === i}
              className={`rounded-full border px-3 py-1 text-sm font-bold transition-colors ${
                n === i ? "border-accent bg-accent text-white" : "border-line bg-surface text-ink hover:border-accent"
              }`}
            >
              {e.name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted">{ex.blurb}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Degrees of each dot">
          {ex.degrees.map((d, n) => (
            <span
              key={n}
              className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-extrabold text-white ${
                d % 2 === 1 ? "bg-red-400" : "bg-emerald-500"
              }`}
            >
              {d}
            </span>
          ))}
        </div>
        <p className="mt-4 text-center">
          <span className="font-display font-bold">
            {v.odd} odd {v.odd === 1 ? "dot" : "dots"}.
          </span>{" "}
          <span className={v.ok ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}>{v.text}</span>
        </p>
      </div>

      <Callout tone="fun" title="The pen-and-paper version">
        Any "draw this shape without lifting your pen or retracing a line" puzzle is the Königsberg
        problem in disguise. Count the odd corners. If there are more than two, the puzzle is a
        trick.
      </Callout>
    </div>
  );
}
