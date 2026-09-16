import MiniSteps from "../../../components/MiniSteps";
import Callout from "../../../components/Callout";
import { trackInteraction } from "../../../lib/analytics";

export default function TheSetParadox() {
  return (
    <div className="story-prose">
      <h2>The Paradox</h2>
      <p>
        <code>R</code> is the set of all sets that do not contain themselves. So:{" "}
        <strong>does R contain itself?</strong>
      </p>
      <MiniSteps
        nextLabel="Try it"
        onChange={(i) => trackInteraction({ story: "russells-paradox", widget: "paradox_walk", action: "scene", value: i })}
        scenes={[
          <p className="text-center text-muted">There are only two possible answers. Let's try both.</p>,
          <div className="rounded-2xl bg-surface-2 p-5 shadow-card">
            <p className="font-display text-lg font-bold">Answer 1: Yes, R contains itself.</p>
            <p className="mt-2">
              But <code>R</code> only contains sets that do <em>not</em> contain themselves. If{" "}
              <code>R</code> is in <code>R</code>, it must be a set that doesn't contain itself. Which
              means it <em>isn't</em> in <code>R</code>. Contradiction.
            </p>
          </div>,
          <div className="rounded-2xl bg-surface-2 p-5 shadow-card">
            <p className="font-display text-lg font-bold">Answer 2: No, R does not contain itself.</p>
            <p className="mt-2">
              Then <code>R</code> is a set that doesn't contain itself. And <code>R</code> collects{" "}
              <em>every</em> such set. So <code>R</code> must be in <code>R</code>. Contradiction
              again.
            </p>
          </div>,
          <div className="rounded-2xl bg-red-400 p-5 text-white shadow-card">
            <p className="font-display text-lg font-bold">Both answers are wrong. 🤯</p>
            <p className="mt-2">
              If <code className="text-white">R</code> is in itself, it isn't. If it isn't, it is.
              There is no consistent answer, so the "set" <code className="text-white">R</code> can't
              exist. But naive set theory said it must.
            </p>
          </div>,
        ]}
      />
      <Callout tone="history" title="What happened next">
        Mathematicians rebuilt set theory with stricter rules about which collections count as sets.
        The version most people use today, called ZFC after Zermelo and Fraenkel, simply forbids the
        kind of unrestricted "set of everything with property P" that Russell exploited. Russell and
        Whitehead spent a decade on their own fix, the three-volume Principia Mathematica, which
        famously takes several hundred pages to prove that 1 + 1 = 2.
      </Callout>
      <p>Abstract sets can feel slippery. Let's tell the same story with a barber.</p>
    </div>
  );
}
