import Callout from "../../../components/Callout";
import MiniSteps from "../../../components/MiniSteps";
import { trackInteraction } from "../../../lib/analytics";
import { Stone } from "../art/Objects";

function Pair({ tied }: { tied: boolean }) {
  return (
    <div className="flex items-center justify-center">
      <Stone size={96} label="Heavy" />
      {tied ? (
        <svg width="56" height="24" viewBox="0 0 56 24" aria-hidden>
          <path d="M2 12c10-8 20 8 28 0s16-8 24 0" stroke="rgb(var(--accent))" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      ) : (
        <span className="w-10" />
      )}
      <Stone size={72} label="Light" small />
    </div>
  );
}

export default function TheTwoStones() {
  return (
    <div className="story-prose">
      <h2>The Two Stones</h2>
      <p>
        In 1589, a 25-year-old mathematics lecturer at the University of Pisa named{" "}
        <strong>Galileo Galilei</strong> decided Aristotle's rule couldn't be right. He didn't need
        a tower to see it. He needed two stones and a piece of rope.
      </p>
      <p>
        The argument, which he later published in his 1638 book <em>Two New Sciences</em>, goes
        like this. Click Ok to follow it.
      </p>
      <MiniSteps
        nextLabel="Ok"
        onChange={(i) => trackInteraction({ story: "galileo-falling-bodies", widget: "two_stones", action: "scene", value: i })}
        scenes={[
          <div className="text-center">
            <Pair tied={false} />
            <p className="mt-3">
              Take a heavy stone and a light stone. Aristotle says the heavy one falls faster.
            </p>
          </div>,
          <div className="text-center">
            <Pair tied />
            <p className="mt-3">
              Now tie them together. The light stone falls slower, so it should act like a{" "}
              <strong>drag</strong> on the heavy one. The pair should fall{" "}
              <strong>slower</strong> than the heavy stone alone.
            </p>
          </div>,
          <div className="text-center">
            <Pair tied />
            <p className="mt-3">
              But wait. The pair, tied together, is one object that is <strong>heavier</strong>{" "}
              than the heavy stone. So it should fall <strong>faster</strong> than the heavy stone
              alone.
            </p>
          </div>,
          <div className="rounded-2xl bg-red-400 p-5 text-center text-white shadow-card">
            <p className="font-display text-lg font-bold">Slower and faster at the same time. 🤯</p>
            <p className="mt-2">
              Aristotle's rule contradicts itself. The only way out is that weight doesn't matter:
              heavy and light stones, alone or tied, all fall at the <strong>same rate</strong>.
            </p>
          </div>,
        ]}
      />
      <Callout tone="history" title="About that tower">
        The famous scene of Galileo dropping cannonballs off the Leaning Tower of Pisa comes from a
        biography written by his student Vincenzo Viviani decades after the fact, and most
        historians consider it a legend. Someone did do it, though: in 1586 the Flemish engineer
        Simon Stevin dropped two lead balls, one ten times heavier than the other, from a church
        tower in Delft. They hit the ground with a single thud.
      </Callout>
    </div>
  );
}
