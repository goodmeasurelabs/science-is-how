import type { StoryContent } from "../../content/types";
import CatInBox from "../../assets/cat-in-box.webp";
import EPR from "./steps/EPR";
import TheLetter from "./steps/TheLetter";
import CatAnalogyInformative from "./steps/CatAnalogyInformative";
import CatAnalogyInteractive from "./steps/CatAnalogyInteractive";
import Qbits from "./steps/Qbits";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        Schrödinger's Cat is a thought experiment that Erwin Schrödinger cooked up in 1935 to show
        how absurd quantum mechanics sounds when you take it literally.
      </p>
      <p>
        A cat is sealed in a box with a radioactive atom, a Geiger counter, a hammer and a vial of
        poison. If the atom decays, the counter clicks, the hammer swings, the vial breaks, and the
        cat dies. If it doesn't decay, the cat lives. Quantum mechanics says the atom is in a{" "}
        <strong>superposition</strong> of decayed and not-decayed until it's measured. So, until you
        open the box, the cat is both alive and dead.
      </p>
      <p>
        Schrödinger meant it as a joke at the theory's expense. The joke backfired: it became the
        most famous illustration of the theory ever written. Here's how it happened, starting with a
        paper by Einstein.
      </p>
      <figure>
        <img
          src={CatInBox}
          alt="Cartoon cat peeking out of a cardboard box"
          className="illo w-48"
          width={1073}
          height={1133}
        />
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [EPR, TheLetter, CatAnalogyInformative, CatAnalogyInteractive, Qbits],
};

export default story;
