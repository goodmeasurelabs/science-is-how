import { useState } from "react";
import Button from "../../../components/Button";
import { trackInteraction } from "../../../lib/analytics";

const N = 60;

/** A tiny Sieve of Eratosthenes: press the button to cross out the multiples of the next prime. */
export default function Sieve() {
  const [crossed, setCrossed] = useState<Record<number, number>>({});
  const [primes, setPrimes] = useState<number[]>([]);

  const nextPrime = (() => {
    for (let n = 2; n <= N; n++) if (!crossed[n] && !primes.includes(n)) return n;
    return undefined;
  })();

  const sieve = () => {
    if (!nextPrime) return;
    const p = nextPrime;
    const next = { ...crossed };
    for (let m = p * 2; m <= N; m += p) if (!next[m]) next[m] = p;
    setCrossed(next);
    setPrimes([...primes, p]);
    trackInteraction({ story: "eratosthenes", widget: "sieve", action: "step", value: p });
  };

  const reset = () => {
    setCrossed({});
    setPrimes([]);
  };

  // Once the next prime squared passes N, nothing left can be crossed out: every survivor is prime.
  const done = !nextPrime || nextPrime * nextPrime > N;
  const remaining = Array.from({ length: N - 1 }, (_, i) => i + 2).filter((n) => !crossed[n]);

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface-2 p-4 shadow-card">
      <div className="grid grid-cols-10 gap-1 text-center text-sm font-bold tabular-nums">
        {Array.from({ length: N - 1 }, (_, i) => i + 2).map((n) => {
          const by = crossed[n];
          const isPrime = primes.includes(n) || (done && !by);
          return (
            <div
              key={n}
              className={`rounded-md py-1 transition-colors ${
                isPrime
                  ? "bg-accent text-white"
                  : by
                    ? "bg-line/60 text-muted line-through"
                    : "bg-surface text-ink"
              }`}
              title={by ? `multiple of ${by}` : undefined}
            >
              {n}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {!done ? (
          <Button size="sm" variant="primary" onClick={sieve}>
            Keep {nextPrime}, cross out its multiples
          </Button>
        ) : (
          <p className="text-sm font-bold text-accent">
            Done. {remaining.length} primes survived the sieve.
          </p>
        )}
        {(primes.length > 0 || done) && (
          <Button size="sm" variant="ghost" onClick={reset}>
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
