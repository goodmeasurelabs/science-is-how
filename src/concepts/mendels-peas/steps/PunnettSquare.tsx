import { useState } from "react";
import Callout from "../../../components/Callout";
import Pea from "../art/Pea";
import { trackInteraction } from "../../../lib/analytics";
import { expectedRatio, GENOTYPES, genotypeLabel, isWrinkled, punnett, type Genotype, alleles } from "../genetics";

function GenotypePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Genotype;
  onChange: (g: Genotype) => void;
}) {
  return (
    <div className="text-center">
      <p className="mb-1 font-display text-sm font-bold uppercase tracking-wide text-muted">{label}</p>
      <div className="inline-flex rounded-full border border-line bg-surface-2 p-1" role="group" aria-label={label}>
        {GENOTYPES.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onChange(g)}
            aria-pressed={value === g}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-mono text-sm font-bold transition-colors ${
              value === g ? "bg-accent text-white" : "text-ink hover:bg-ink/5"
            }`}
          >
            <Pea wrinkled={isWrinkled(g)} size={18} />
            {g}
          </button>
        ))}
      </div>
      <p className="mt-1 text-xs text-muted">{genotypeLabel[value]}</p>
    </div>
  );
}

export function PunnettGrid({ mom, dad }: { mom: Genotype; dad: Genotype }) {
  const cells = punnett(mom, dad);
  const [m1, m2] = alleles(mom);
  const [d1, d2] = alleles(dad);
  const head = "flex items-center justify-center font-mono text-lg font-extrabold text-accent";
  return (
    <div className="mx-auto grid w-fit grid-cols-[2.5rem_5rem_5rem] grid-rows-[2.5rem_5rem_5rem] gap-1 md:grid-cols-[3rem_6rem_6rem] md:grid-rows-[3rem_6rem_6rem]" role="table" aria-label="Punnett square">
      <div />
      <div className={head} role="columnheader">{d1}</div>
      <div className={head} role="columnheader">{d2}</div>
      {[m1, m2].map((m, row) => (
        <div key={row} className="contents">
          <div className={head} role="rowheader">{m}</div>
          {cells.slice(row * 2, row * 2 + 2).map((c, col) => (
            <div
              key={col}
              role="cell"
              className={`flex flex-col items-center justify-center rounded-xl border-2 ${
                isWrinkled(c.cell) ? "border-amber-400 bg-amber-100/60 dark:bg-amber-900/30" : "border-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/30"
              }`}
            >
              <Pea wrinkled={isWrinkled(c.cell)} size={34} />
              <span className="font-mono text-sm font-bold">{c.cell}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function PunnettSquare() {
  const [mom, setMom] = useState<Genotype>("Rr");
  const [dad, setDad] = useState<Genotype>("Rr");
  const ratio = expectedRatio(mom, dad);
  const pick = (who: "mom" | "dad", g: Genotype) => {
    if (who === "mom") setMom(g);
    else setDad(g);
    trackInteraction({ story: "mendels-peas", widget: "punnett", action: "choose_cross", value: `${who === "mom" ? g : mom}x${who === "dad" ? g : dad}` });
  };

  return (
    <div className="story-prose">
      <h2>The Punnett Square</h2>
      <p>
        Each parent has two factors and hands down one of them, picked at random. So there are
        four equally likely combinations for each seed. Lay them out in a grid: one parent's
        factors across the top, the other's down the side. Each cell is a possible offspring.
      </p>
      <p>
        Try it. Start with the F1 × F1 cross (<code>Rr</code> × <code>Rr</code>) and then change the
        parents.
      </p>

      <div className="my-6 flex flex-col items-center gap-5 rounded-3xl border border-line bg-surface p-5 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <GenotypePicker label="Parent 1" value={mom} onChange={(g) => pick("mom", g)} />
          <GenotypePicker label="Parent 2" value={dad} onChange={(g) => pick("dad", g)} />
        </div>
        <PunnettGrid mom={mom} dad={dad} />
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Expected offspring</p>
          <p className="font-display text-2xl font-extrabold">{ratio.text}</p>
          <p className="text-sm text-muted">
            {ratio.round} of 4 cells carry at least one <code className="font-mono">R</code>, so they look round.
          </p>
        </div>
      </div>

      <p>
        With <code>Rr</code> × <code>Rr</code>, three cells contain an <code>R</code> and look round.
        Only <code>rr</code> looks wrinkled. <strong>3 : 1.</strong> The recessive factor didn't
        vanish in F1; it was hiding behind a dominant partner, waiting for a generation where it
        could pair up with another <code>r</code>.
      </p>
      <Callout tone="history" title="Whose square?">
        Mendel never drew one of these. The grid was invented around 1905 by the English geneticist
        Reginald Punnett, forty years after Mendel's paper, as a teaching aid. The idea is Mendel's;
        the tidy box is Punnett's.
      </Callout>
    </div>
  );
}
