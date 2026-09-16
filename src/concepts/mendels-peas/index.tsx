import type { StoryContent } from "../../content/types";
import Cover from "../../assets/mendels-peas.svg";
import Callout from "../../components/Callout";
import TheMonk from "./steps/TheMonk";
import SevenTraits from "./steps/SevenTraits";
import TheFirstCross from "./steps/TheFirstCross";
import PunnettSquare from "./steps/PunnettSquare";
import GrowPlants from "./steps/GrowPlants";
import Ignored from "./steps/Ignored";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        Between 1856 and 1863, a friar named Gregor Mendel grew roughly{" "}
        <strong>28,000 pea plants</strong> in a monastery garden and wrote down what their
        offspring looked like. Round seeds or wrinkled. Tall plants or short. Purple flowers or
        white.
      </p>
      <p>
        Hidden in those tallies was a number that kept showing up: <strong>3 to 1</strong>. Mendel
        worked out why, and in doing so wrote the rules of heredity decades before anyone knew what
        a gene was.
      </p>
      <p>
        Then almost nobody read it. For 34 years the most important paper in biology sat on
        library shelves while Mendel went back to running his abbey. This is the story of the
        garden, the ratio, and the three scientists who finally found the paper in 1900.
      </p>
      <Callout tone="fun">
        You'll build a Punnett square and grow a hundred pea plants yourself. No dirt required.
      </Callout>
      <figure>
        <img src={Cover} alt="A cartoon pea pod with three round peas and one wrinkled pea peeking out" className="illo w-48" width={200} height={200} />
        <figcaption>Three round, one wrinkled. Remember that.</figcaption>
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [TheMonk, SevenTraits, TheFirstCross, PunnettSquare, GrowPlants, Ignored],
};

export default story;
