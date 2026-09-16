import Callout from "../../../components/Callout";
import { Ball, Feather } from "../art/Objects";

export default function WhyItMattered() {
  return (
    <div className="story-prose">
      <h2>Why It Mattered</h2>
      <p>
        Galileo's falling bodies did more than embarrass Aristotle. They changed what counts as
        knowing something. Before, a rule was true if a great authority said it and it matched
        common sense. After, a rule was true if it survived a <strong>measured experiment</strong>.
        That habit is basically what we mean by science.
      </p>
      <p>
        The specific result mattered too. "Everything falls with the same acceleration" became the
        clue Isaac Newton followed, a few decades later, to his law of gravity: the force on an
        object is proportional to its mass, and so is its resistance to being moved, so the two
        cancel and every object accelerates alike. The same law that pulls the feather pulls the
        Moon.
      </p>
      <div className="my-8 flex items-center justify-center gap-6">
        <Ball size={64} />
        <span className="font-display text-3xl font-extrabold text-accent">=</span>
        <Feather size={64} />
      </div>
      <p>
        Three hundred years after that, Einstein turned the same fact inside out. If everything
        falls identically, then falling feels exactly like floating, and gravity can be described
        as the shape of space and time itself. He later called that realisation "the happiest
        thought of my life."
      </p>
      <Callout tone="info" title="Where you meet it today">
        <ul>
          <li>
            <strong>Parachutes</strong> work by making air drag huge compared to weight, turning a
            skydiver into a feather.
          </li>
          <li>
            <strong>Astronauts float</strong> on the space station not because there's no gravity
            up there (there's about 90% of it) but because they and the station are falling
            together, just as Galileo's tied stones would.
          </li>
          <li>
            From 2016 to 2022 the <strong>MICROSCOPE</strong> satellite tested whether different
            materials fall identically, to about one part in a thousand trillion. They do.
          </li>
        </ul>
      </Callout>
      <p>
        Not bad for two stones and a piece of rope.
      </p>
    </div>
  );
}
