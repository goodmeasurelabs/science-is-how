import Callout from "../../../components/Callout";
import WellSyene from "../art/WellSyene";

export default function TheWell() {
  return (
    <div className="story-prose">
      <h2>The Well at Syene</h2>
      <p>
        Far up the Nile, about 800 km south of Alexandria, sat the town of <strong>Syene</strong>,
        today's Aswan. Eratosthenes had heard something curious about it. At noon on the summer
        solstice, the longest day of the year, the Sun there stood exactly overhead.
      </p>
      <p>
        A vertical stick cast <em>no shadow</em>. Sunlight reached all the way to the bottom of a
        deep well, lighting up the water. For one moment each year, Syene had no shade.
      </p>
      <WellSyene />
      <p>
        We know why now: Syene lies almost exactly on the Tropic of Cancer, the northern limit of
        where the Sun can ever be directly overhead. Eratosthenes didn't need that explanation. He
        just needed the fact, and one more observation from home.
      </p>
      <Callout tone="info" title="The idea">
        If the Sun is overhead in Syene but <em>not</em> overhead in Alexandria at the same
        moment, the ground must be tilted between the two cities. Measure how much, and you've
        measured a slice of the Earth's curve.
      </Callout>
    </div>
  );
}
