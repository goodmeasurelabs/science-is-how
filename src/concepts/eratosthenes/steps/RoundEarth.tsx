import MiniSteps from "../../../components/MiniSteps";
import ShipHorizon from "../art/ShipHorizon";
import EclipseShadow from "../art/EclipseShadow";
import StarsShift from "../art/StarsShift";
import { trackInteraction } from "../../../lib/analytics";

export default function RoundEarth() {
  return (
    <div className="story-prose">
      <h2>Everyone Knew It Was Round</h2>
      <p>
        First, a myth to clear up. Educated Greeks of the third century BC did not think the Earth
        was flat. A century earlier, Aristotle had already written down the evidence. Click through
        the three big clues.
      </p>
      <MiniSteps
        className="mt-6"
        onChange={(i) => trackInteraction({ story: "eratosthenes", widget: "round_earth_clues", action: "scene", value: i })}
        scenes={[
          <p className="text-center text-muted">Three clues. Ok to see the first.</p>,
          <div>
            <ShipHorizon stage={0} />
            <p className="mt-3 text-center"><strong>Clue 1: ships.</strong> Watch a ship sail away from port.</p>
          </div>,
          <div>
            <ShipHorizon stage={1} />
            <p className="mt-3 text-center">The hull disappears first, while the sail is still in view.</p>
          </div>,
          <div>
            <ShipHorizon stage={2} />
            <p className="mt-3 text-center">
              Then the sail goes. On a flat sea the whole ship would just shrink. It's sinking behind a
              curve.
            </p>
          </div>,
          <div>
            <EclipseShadow />
            <p className="mt-3 text-center">
              <strong>Clue 2: eclipses.</strong> During a lunar eclipse the Earth's shadow crosses the
              Moon, and its edge is always a circle. Only a sphere casts a round shadow from every angle.
            </p>
          </div>,
          <div>
            <StarsShift />
            <p className="mt-3 text-center">
              <strong>Clue 3: stars.</strong> Travel south and new stars rise above the horizon while
              northern ones sink. That only happens if the ground beneath you is curving.
            </p>
          </div>,
        ]}
      />
      <p className="mt-8">
        So the shape wasn't in doubt. The open question was the one nobody had a good way to
        answer: <strong>how big is it?</strong> You can't pace out a planet. Eratosthenes realised
        you don't have to.
      </p>
    </div>
  );
}
