import Callout from "../../../components/Callout";
import EulerPortrait from "../art/EulerPortrait";

export default function EulersLetter() {
  return (
    <div className="story-prose">
      <h2>Euler Gets a Letter</h2>
      <p>
        In 1735 the puzzle reached <strong>Leonhard Euler</strong>, a 28-year-old Swiss
        mathematician working at the Academy of Sciences in St Petersburg. It came from Carl
        Ehler, the mayor of nearby Danzig, who was a keen amateur and kept writing to Euler with
        problems.
      </p>
      <p>
        Euler's first reaction was a shrug. He replied that the question seemed to have little to
        do with mathematics, and he didn't see why a mathematician, rather than anyone else, should
        be expected to answer it.
      </p>
      <p>
        Then it nagged at him. The puzzle wasn't about lengths or angles or numbers, the things
        geometry and algebra handle. It was about <em>position</em>: which piece of land connects
        to which. Leibniz had once mused about a "geometry of position" that would work like
        that. Nobody had actually built one.
      </p>
      <Callout tone="history" title="August 26, 1736">
        Euler presented his solution to the St Petersburg Academy under the title{" "}
        <em>Solutio problematis ad geometriam situs pertinentis</em>, "the solution of a problem
        relating to the geometry of position." It appeared in print in 1741. He was so unbothered by
        the puzzle itself that he spent most of the paper on the general method.
      </Callout>
      <p>
        That general method is the reason we're still talking about it. Here's the trick.
      </p>
      <figure>
        <EulerPortrait className="w-40" />
        <figcaption>Leonhard Euler, 1707–1783. Probably not thinking about bridges.</figcaption>
      </figure>
    </div>
  );
}
