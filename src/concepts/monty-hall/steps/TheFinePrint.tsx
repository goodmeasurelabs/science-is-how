import { useState } from "react";
import Button from "../../../components/Button";
import Callout from "../../../components/Callout";
import { simulateRandomHost } from "../game";
import { trackInteraction } from "../../../lib/analytics";

export default function TheFinePrint() {
  const [res, setRes] = useState<{ stay: number; switch: number; played: number } | null>(null);
  const run = () => {
    const r = simulateRandomHost(10000);
    setRes(r);
    trackInteraction({ story: "monty-hall", widget: "random_host", action: "run", value: r.played });
  };
  const pct = (n: number) => (res && res.played ? `${((n / res.played) * 100).toFixed(1)}%` : "—");

  return (
    <div className="story-prose">
      <h2>The Fine Print</h2>
      <p>
        Marilyn's answer depends on two rules that the puzzle usually leaves unspoken. Monty{" "}
        <strong>always</strong> opens a door, and the door he opens is <strong>always</strong> a
        goat, because he knows where the car is. Change either rule and the answer changes.
      </p>
      <p>
        Imagine a clueless host, "Monty Fall," who trips and knocks open a random unpicked door.
        Sometimes he reveals the car and the round is ruined. When he happens to show a goat, is
        switching still better?
      </p>
      <div className="my-6 rounded-3xl border border-line bg-surface-2 p-6 text-center shadow-card">
        <Button variant="primary" onClick={run}>
          Play 10,000 rounds with a clueless host
        </Button>
        {res && (
          <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Rounds that counted</div>
              <div className="font-display text-2xl font-extrabold tabular-nums">{res.played.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Stay wins</div>
              <div className="font-display text-2xl font-extrabold tabular-nums">{pct(res.stay)}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Switch wins</div>
              <div className="font-display text-2xl font-extrabold tabular-nums text-accent">{pct(res.switch)}</div>
            </div>
          </div>
        )}
      </div>
      <p>
        With a clueless host, it really is 50/50. The reason is that a goat reveal from a random
        host is <em>more likely</em> to happen when your first pick was the car (then he can't
        accidentally reveal it). That extra clue exactly cancels the switching advantage.
      </p>
      <Callout tone="info" title="Why this matters beyond game shows">
        The Monty Hall problem is a tiny lesson in <strong>conditional probability</strong>: what
        you should believe depends not just on what you saw, but on the process that decided what
        you'd get to see. Doctors reading test results, judges weighing evidence and spam filters
        all live on that idea. Monty was just the one with the goats.
      </Callout>
      <p>
        The real Monty Hall, by the way, was asked about all this in 1991. He pointed out that on
        the actual show he wasn't bound by any rule, and would happily offer cash to a contestant
        standing in front of the car to get them to walk away. Never trust the host.
      </p>
    </div>
  );
}
