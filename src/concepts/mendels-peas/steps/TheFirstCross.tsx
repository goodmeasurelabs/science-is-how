import MiniSteps from "../../../components/MiniSteps";
import Callout from "../../../components/Callout";
import Pea from "../art/Pea";
import { trackInteraction } from "../../../lib/analytics";

function PeaRow({ pattern, size = 34 }: { pattern: ("R" | "w")[]; size?: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-1">
      {pattern.map((p, i) => (
        <Pea key={i} wrinkled={p === "w"} size={size} />
      ))}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-center font-display text-sm font-bold uppercase tracking-wide text-muted">{children}</p>;
}

const f2: ("R" | "w")[] = [];
for (let i = 0; i < 24; i++) f2.push(i % 4 === 3 ? "w" : "R");

export default function TheFirstCross() {
  return (
    <div className="story-prose">
      <h2>The First Cross</h2>
      <p>
        Take a true-breeding round-seed plant and a true-breeding wrinkled-seed plant. Cross them
        by hand. Plant the seeds. What comes up?
      </p>
      <MiniSteps
        className="mt-6"
        nextLabel="Ok"
        onChange={(i) => trackInteraction({ story: "mendels-peas", widget: "first_cross", action: "scene", value: i })}
        scenes={[
          <div>
            <Label>The parents</Label>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <PeaRow pattern={["R", "R", "R"]} />
                <p className="mt-1 text-sm">Always round</p>
              </div>
              <span className="font-display text-3xl text-accent">×</span>
              <div className="text-center">
                <PeaRow pattern={["w", "w", "w"]} />
                <p className="mt-1 text-sm">Always wrinkled</p>
              </div>
            </div>
          </div>,
          <div>
            <Label>First generation (F1)</Label>
            <PeaRow pattern={Array(12).fill("R")} />
            <p className="mt-3 text-center">
              <strong>Every single seed is round.</strong> Wrinkled has disappeared. Round is
              dominant.
            </p>
          </div>,
          <div>
            <Label>Now let the F1 plants fertilise themselves...</Label>
            <p className="text-center text-muted">If wrinkled is really gone, the next generation should be all round too.</p>
          </div>,
          <div>
            <Label>Second generation (F2)</Label>
            <PeaRow pattern={f2} size={30} />
            <p className="mt-3 text-center">
              <strong>Wrinkled is back.</strong> It skipped a generation and returned, in about one
              seed out of four.
            </p>
          </div>,
          <div className="rounded-2xl bg-surface-2 p-5 shadow-card">
            <Label>Mendel's actual count for seed shape</Label>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <Pea size={40} />
                <p className="font-display text-2xl font-extrabold">5,474</p>
                <p className="text-sm text-muted">round</p>
              </div>
              <div>
                <Pea wrinkled size={40} />
                <p className="font-display text-2xl font-extrabold">1,850</p>
                <p className="text-sm text-muted">wrinkled</p>
              </div>
            </div>
            <p className="mt-3 text-center">
              That's <strong>2.96 to 1</strong>. He got the same 3 : 1 for all seven traits. Seed
              colour: 6,022 yellow to 2,001 green. Flower colour: 705 purple to 224 white.
            </p>
          </div>,
        ]}
      />
      <Callout tone="info" title="Why 3 to 1?">
        Mendel's explanation, which he had to invent from scratch: each plant carries{" "}
        <strong>two</strong> copies of a hidden "factor" for each trait, one from each parent, and
        it passes on just one of them, chosen at random. Call the round factor <code>R</code> and
        the wrinkled one <code>r</code>. Round parents are <code>RR</code>, wrinkled parents are{" "}
        <code>rr</code>, so every F1 plant is <code>Rr</code>: it looks round, but it's secretly
        carrying wrinkled. The next step shows what happens when two <code>Rr</code> plants meet.
      </Callout>
    </div>
  );
}
