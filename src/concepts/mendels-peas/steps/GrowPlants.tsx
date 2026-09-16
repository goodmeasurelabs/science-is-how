import { useState } from "react";
import Button from "../../../components/Button";
import Callout from "../../../components/Callout";
import Pea from "../art/Pea";
import { trackInteraction } from "../../../lib/analytics";
import { breed, expectedRatio, GENOTYPES, isWrinkled, type Genotype } from "../genetics";

const SIZES = [100, 1000] as const;

export default function GrowPlants() {
  const [mom, setMom] = useState<Genotype>("Rr");
  const [dad, setDad] = useState<Genotype>("Rr");
  const [n, setN] = useState<(typeof SIZES)[number]>(100);
  const [crop, setCrop] = useState<Genotype[] | null>(null);
  const [runs, setRuns] = useState(0);

  const expected = expectedRatio(mom, dad);
  const wrinkled = crop ? crop.filter(isWrinkled).length : 0;
  const round = crop ? crop.length - wrinkled : 0;
  const observed = wrinkled > 0 ? (round / wrinkled).toFixed(2) : null;

  const grow = () => {
    setCrop(breed(mom, dad, n));
    setRuns((r) => r + 1);
    trackInteraction({ story: "mendels-peas", widget: "grow_plants", action: "grow", value: `${mom}x${dad}:${n}` });
  };

  const chooser = (label: string, value: Genotype, set: (g: Genotype) => void) => (
    <label className="flex items-center gap-2 text-sm">
      <span className="font-display font-bold">{label}</span>
      <select
        value={value}
        onChange={(e) => {
          set(e.target.value as Genotype);
          setCrop(null);
        }}
        className="rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono font-bold text-ink"
      >
        {GENOTYPES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="story-prose">
      <h2>Grow a Hundred Plants</h2>
      <p>
        A Punnett square gives the <em>odds</em>. Real seeds are a coin flip each, so a real crop
        never lands on exactly 3 : 1. Mendel's 5,474 to 1,850 was 2.96 : 1, and that was with
        thousands of seeds. Plant your own and watch the ratio wobble.
      </p>

      <div className="my-6 rounded-3xl border border-line bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {chooser("Parent 1", mom, setMom)}
          <span className="font-display text-xl text-accent">×</span>
          {chooser("Parent 2", dad, setDad)}
          <div className="inline-flex rounded-full border border-line bg-surface-2 p-1" role="group" aria-label="Crop size">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={n === s}
                onClick={() => {
                  setN(s);
                  setCrop(null);
                }}
                className={`rounded-full px-3 py-1 text-sm font-bold ${n === s ? "bg-accent text-white" : "hover:bg-ink/5"}`}
              >
                {s.toLocaleString()}
              </button>
            ))}
          </div>
          <Button variant="primary" onClick={grow}>
            {crop ? "Grow again" : `Grow ${n.toLocaleString()} plants`}
          </Button>
        </div>

        {crop ? (
          <>
            <div className="mt-5 flex flex-wrap justify-center gap-6 text-center">
              <div>
                <Pea size={32} />
                <p className="font-display text-2xl font-extrabold tabular-nums">{round.toLocaleString()}</p>
                <p className="text-xs text-muted">round</p>
              </div>
              <div>
                <Pea wrinkled size={32} />
                <p className="font-display text-2xl font-extrabold tabular-nums">{wrinkled.toLocaleString()}</p>
                <p className="text-xs text-muted">wrinkled</p>
              </div>
              <div className="self-center">
                <p className="text-xs font-bold uppercase tracking-wide text-muted">Observed</p>
                <p className="font-display text-2xl font-extrabold tabular-nums">
                  {observed ? `${observed} : 1` : wrinkled === 0 ? "All round" : "All wrinkled"}
                </p>
                <p className="text-xs text-muted">expected {expected.text.toLowerCase()}</p>
              </div>
            </div>
            <div
              className={`mx-auto mt-4 grid justify-center gap-[2px] ${n === 100 ? "grid-cols-10" : "grid-cols-[repeat(40,minmax(0,1fr))]"}`}
              aria-label={`${n} pea plants: ${round} round, ${wrinkled} wrinkled`}
            >
              {crop.map((g, i) => (
                <Pea key={i} wrinkled={isWrinkled(g)} size={n === 100 ? 26 : 9} />
              ))}
            </div>
            {runs >= 3 && (
              <p className="mt-4 text-center text-sm text-muted">
                Run {runs}. Notice the 1,000-plant crops land closer to the expected ratio than the 100-plant ones. More seeds, less wobble. That's why Mendel counted so many.
              </p>
            )}
          </>
        ) : (
          <p className="mt-5 text-center text-sm text-muted">Pick a cross and hit Grow.</p>
        )}
      </div>

      <Callout tone="info" title="Two traits at once">
        Mendel also tracked pairs of traits together, like seed shape and seed colour. He found
        each trait sorted itself out independently, which turns 3 : 1 into{" "}
        <strong>9 : 3 : 3 : 1</strong> (round-yellow, round-green, wrinkled-yellow,
        wrinkled-green). That's his second law: different traits are inherited independently.
        It's mostly true, with an exception (genes that sit near each other on the same
        chromosome) that nobody would discover for another fifty years.
      </Callout>
    </div>
  );
}
