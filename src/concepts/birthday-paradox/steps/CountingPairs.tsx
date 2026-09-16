import MiniSteps from "../../../components/MiniSteps";
import Callout from "../../../components/Callout";
import Face from "../art/Face";
import { trackInteraction } from "../../../lib/analytics";

/** People on a circle with lines drawn between the first `upTo` people and everyone else. */
function PairCircle({ people, upTo, label }: { people: number; upTo: number; label: string }) {
  const R = 100;
  const cx = 130;
  const cy = 120;
  const pos = Array.from({ length: people }, (_, i) => {
    const a = (i / people) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  const lines: [number, number][] = [];
  for (let i = 0; i < Math.min(upTo, people); i++)
    for (let j = i + 1; j < people; j++) lines.push([i, j]);
  return (
    <figure className="!my-0 flex flex-col items-center">
      <svg viewBox="0 0 260 240" className="w-64 md:w-72" aria-hidden>
        {lines.map(([i, j], k) => (
          <line
            key={k}
            x1={pos[i].x}
            y1={pos[i].y}
            x2={pos[j].x}
            y2={pos[j].y}
            stroke={i === upTo - 1 ? "rgb(var(--accent))" : "rgb(var(--accent-2))"}
            strokeWidth={i === upTo - 1 ? 2.5 : 1.2}
            opacity={i === upTo - 1 ? 1 : 0.5}
          />
        ))}
        {pos.map((p, i) => (
          <g key={i} transform={`translate(${p.x - 16} ${p.y - 16})`}>
            <Face seed={i * 5 + 2} size={32} highlight={i < upTo} color={i === upTo - 1 ? "#ff7a59" : "#60c2e8"} />
          </g>
        ))}
      </svg>
      <figcaption className="text-sm text-muted">{label}</figcaption>
    </figure>
  );
}

export default function CountingPairs() {
  const people = 10;
  return (
    <div className="story-prose">
      <h2>Counting Pairs</h2>
      <p>
        Here's the mistake everyone makes. When you hear "two people share a birthday," you
        quietly picture <em>your</em> birthday, and ask how likely it is that someone else in the
        room has it. That's a question about one person versus 22 others: 22 chances at a 1-in-365
        shot. Small.
      </p>
      <p>
        But the bet isn't about you. It's about <strong>any two people</strong>. Every pair in the
        room is a fresh chance for a match, and there are a lot more pairs than people.
      </p>
      <MiniSteps
        className="mt-4"
        nextLabel="Add a person"
        onChange={(i) => trackInteraction({ story: "birthday-paradox", widget: "pair_circle", action: "scene", value: i })}
        scenes={[
          <PairCircle people={people} upTo={0} label={`${people} people. Let's count the pairs.`} />,
          <PairCircle people={people} upTo={1} label="Person 1 pairs with 9 others. 9 pairs." />,
          <PairCircle people={people} upTo={2} label="Person 2 adds 8 new pairs. 17 so far." />,
          <PairCircle people={people} upTo={3} label="Person 3 adds 7 more. 24." />,
          <PairCircle people={people} upTo={5} label="Keep going: 9 + 8 + 7 + 6 + 5 ..." />,
          <PairCircle people={people} upTo={10} label="10 people make 45 pairs. Each one is a chance to match." />,
        ]}
      />
      <p className="mt-6">
        The number of pairs among <code>n</code> people is <code>n × (n − 1) / 2</code>. It grows
        with the <em>square</em> of the room size:
      </p>
      <div className="my-4 overflow-x-auto">
        <table className="mx-auto text-center text-sm tabular-nums">
          <thead>
            <tr className="text-muted">
              <th className="px-3 py-1 font-bold">People</th>
              <th className="px-3 py-1 font-bold">Pairs</th>
            </tr>
          </thead>
          <tbody>
            {[10, 23, 30, 50, 70].map((n) => (
              <tr key={n} className={n === 23 ? "font-bold text-accent" : ""}>
                <td className="px-3 py-1">{n}</td>
                <td className="px-3 py-1">{(n * (n - 1)) / 2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout tone="info" title="The 253 trick">
        23 people make 253 pairs. And 253 is also, roughly, how many <em>other people</em> you'd
        need to meet before one of them has a 50% chance of sharing <em>your</em> birthday. Same
        number of chances, so roughly the same odds. The room doesn't need to be big. It just
        needs to be well connected.
      </Callout>
    </div>
  );
}
