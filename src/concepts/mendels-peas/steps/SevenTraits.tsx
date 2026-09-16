import { useState } from "react";
import Callout from "../../../components/Callout";
import { trackInteraction } from "../../../lib/analytics";
import { FlowerColor, FlowerPosition, PlantHeight, PodColor, PodShape, SeedColor, SeedShape } from "../art/TraitIcons";

const traits = [
  { name: "Seed shape", forms: ["Round", "Wrinkled"], Icon: SeedShape },
  { name: "Seed colour", forms: ["Yellow", "Green"], Icon: SeedColor },
  { name: "Flower colour", forms: ["Purple", "White"], Icon: FlowerColor },
  { name: "Pod shape", forms: ["Inflated", "Constricted"], Icon: PodShape },
  { name: "Pod colour", forms: ["Green", "Yellow"], Icon: PodColor },
  { name: "Flower position", forms: ["Along the stem", "At the tip"], Icon: FlowerPosition },
  { name: "Plant height", forms: ["Tall", "Short"], Icon: PlantHeight },
] as const;

export default function SevenTraits() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="story-prose">
      <h2>Seven Traits</h2>
      <p>
        Mendel's first trick was to ignore almost everything. A pea plant has hundreds of
        features. He picked just <strong>seven traits</strong>, each of which came in exactly two
        clear-cut forms with nothing in between. A seed is round or it's wrinkled. A plant is
        tall or it's short.
      </p>
      <p>
        He also spent two years making sure his starting plants were{" "}
        <strong>true-breeding</strong>: a round-seed line that, left to itself, produced only round
        seeds, generation after generation. Only then did he start crossing.
      </p>

      <ul className="!list-none !pl-0 my-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {traits.map((t) => (
          <li key={t.name} className="flex items-center gap-3 rounded-2xl border border-line bg-surface-2 px-3 py-2 shadow-card">
            <div className="flex items-center gap-1">
              <t.Icon variant={0} />
              <span className="text-muted" aria-hidden>vs</span>
              <t.Icon variant={1} />
            </div>
            <div className="text-sm">
              <div className="font-display font-bold">{t.name}</div>
              <div className="text-muted">
                {t.forms[0]}
                {revealed && <span className="ml-1 text-accent font-semibold">(wins)</span>} or {t.forms[1]}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p>
        Here's a question to keep in mind. If you cross a tall plant with a short one, what do you
        get? Medium? A mix of tall and short? Something else?
      </p>
      {!revealed ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              setRevealed(true);
              trackInteraction({ story: "mendels-peas", widget: "seven_traits", action: "reveal" });
            }}
            className="rounded-full bg-accent px-5 py-2.5 font-display font-bold text-white shadow-card hover:brightness-105"
          >
            Reveal what Mendel found
          </button>
        </div>
      ) : (
        <Callout tone="info" title="One form always wins">
          For every one of the seven traits, the first-generation offspring all looked like{" "}
          <em>one</em> parent. Tall × short gave all tall. Round × wrinkled gave all round. The
          other form seemed to vanish. Mendel called the winning form <strong>dominant</strong>{" "}
          and the vanishing one <strong>recessive</strong>. The forms listed first above are the
          dominant ones.
        </Callout>
      )}
    </div>
  );
}
