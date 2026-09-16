import type { StoryContent } from "../../content/types";
import Bertrand from "../../assets/charles-bertrand.webp";
import Callout from "../../components/Callout";
import SetsBasic from "./steps/SetsBasic";
import SelfContainingSets from "./steps/SelfContainingSets";
import NonSelfContainingSets from "./steps/NonSelfContainingSets";
import TheSetParadox from "./steps/TheSetParadox";
import BarberExample from "./steps/BarberExample";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        Russell's Paradox is a famous crack in the foundations of mathematics. Bertrand Russell
        found it in 1901 while thinking about <strong>sets</strong>, which are just collections of
        things. He asked a simple question:
      </p>
      <blockquote>
        Take the set of all sets that do not contain themselves. Does that set contain itself?
      </blockquote>
      <p>
        Either answer leads to the opposite answer. That one question broke the "naive" set theory
        mathematicians had been using and forced a rebuild of the whole subject.
      </p>
      <Callout tone="history" title="The worst letter a mathematician ever got">
        Russell mailed the paradox to Gottlob Frege in June 1902, just as the second volume of
        Frege's life's work on the foundations of arithmetic was going to the printer. Frege added
        an appendix admitting the flaw: "Hardly anything more unfortunate can befall a scientific
        writer than to have one of the foundations of his edifice shaken after the work is
        finished."
      </Callout>
      <p>First, though, we need a few basic ideas about sets. They only take a minute.</p>
      <figure>
        <img
          src={Bertrand}
          alt="Cartoon Bertrand Russell smoking a pipe"
          className="illo w-40 rounded-full"
          width={1024}
          height={1024}
        />
        <figcaption>Bertrand Russell, 1872–1970</figcaption>
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [SetsBasic, SelfContainingSets, NonSelfContainingSets, TheSetParadox, BarberExample],
};

export default story;
