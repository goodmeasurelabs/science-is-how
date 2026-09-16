import BridgeMap from "../BridgeMap";

export default function SundayPuzzle() {
  return (
    <>
      <div className="story-prose">
        <h2>A Sunday Puzzle</h2>
        <p>
          In the 1700s, Königsberg was a busy Prussian port on the river Pregel. The river split
          the city into four pieces of land: the north bank, the south bank, and two islands in
          the middle. The small central island was called <strong>Kneiphof</strong>, the long one to
          its east, <strong>Lomse</strong>.
        </p>
        <p>
          Seven bridges tied the four pieces together. Kneiphof, the busy one, had five. Lomse had
          three, and each bank had three. Walking across them was a popular way to spend a Sunday
          afternoon, and at some point someone asked the question that made the city famous:
        </p>
        <blockquote>
          Is there a walk through the city that crosses every one of the seven bridges exactly
          once?
        </blockquote>
        <p>
          You can start anywhere and end anywhere. You just can't skip a bridge, and you can't
          cross one twice. People tried it for years. Nobody found a route, and nobody could prove
          there wasn't one.
        </p>
      </div>
      <div className="mt-8">
        <BridgeMap interactive={false} />
        <p className="mt-2 text-center text-sm text-muted">
          Königsberg in 1736: two banks, two islands, seven bridges.
        </p>
      </div>
      <div className="story-prose mt-8">
        <p>Before we get to the answer, you should have a go yourself.</p>
      </div>
    </>
  );
}
