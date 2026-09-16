import Callout from "../../../components/Callout";
import DropTest from "../DropTest";

export default function DropTestStep() {
  return (
    <>
      <div className="story-prose">
        <h2>Drop Test</h2>
        <p>
          Time to settle it. Below is a bowling ball and a feather at the top of a five-metre drop.
          Try it with air first, then switch the air off and drop again. Then go to the Moon.
        </p>
      </div>
      <div className="my-8">
        <DropTest />
      </div>
      <div className="story-prose">
        <Callout tone="info" title="What the feather is actually doing">
          With air, the feather quickly hits a <strong>terminal velocity</strong>: the upward push
          of the air equals its tiny weight, so it stops speeding up and drifts. The ball has a
          much larger weight for its size, so over five metres the air barely slows it. Remove the
          air and there's nothing to tell them apart. Gravity pulls on every kilogram the same, and
          a heavier object has exactly as much more mass to move as it has more pull.
        </Callout>
        <p>
          This is what Galileo saw with his two stones. Aristotle had mistaken air resistance for a
          law of nature.
        </p>
      </div>
    </>
  );
}
