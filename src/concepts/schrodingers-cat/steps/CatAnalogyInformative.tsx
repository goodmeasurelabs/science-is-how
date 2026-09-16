import SchrodingersCatExperiment from "../../../assets/schrodingers-cat-experiment.webp";
import Callout from "../../../components/Callout";

export default function CatAnalogyInformative() {
  return (
    <div className="story-prose">
      <h2>The Cat in the Box</h2>
      <p>
        Schrödinger published the setup in November 1935, in a long paper on the state of quantum
        mechanics. He called it a "ridiculous case." Here it is:
      </p>
      <ol>
        <li>A cat is sealed in a steel box.</li>
        <li>Inside is a tiny amount of radioactive material, with a 50% chance one atom decays within an hour.</li>
        <li>A Geiger counter watches the material. If it clicks, it trips a hammer.</li>
        <li>The hammer smashes a flask of hydrocyanic acid. The cat dies.</li>
      </ol>
      <p>
        Quantum mechanics describes the atom, after an hour, as a superposition of decayed and
        not-decayed. The atom's state is chained to the counter, the hammer, the flask, and the cat.
        So the theory's description of the whole box has the cat, in Schrödinger's words, "mixed or
        smeared out in equal parts" between living and dead.
      </p>
      <Callout tone="info" title="The actual point">
        Schrödinger wasn't claiming cats are really half-dead. He was arguing that a description
        which says so can't be the whole story about what's inside the box. Nearly a century later,
        physicists still argue about what the superposition "really" means. The math, meanwhile,
        keeps working perfectly.
      </Callout>
      <figure>
        <img
          src={SchrodingersCatExperiment}
          alt="Cartoon of the Schrödinger's cat apparatus: a box with a cat, Geiger counter, hammer and vial"
          className="illo w-64"
          width={1182}
          height={1164}
        />
      </figure>
    </div>
  );
}
