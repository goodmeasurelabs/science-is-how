import SpookyAction from "../../../assets/spooky-action.webp";
import Callout from "../../../components/Callout";

export default function EPR() {
  return (
    <div className="story-prose">
      <h2>The EPR Paradox</h2>
      <p>
        In May 1935, Albert Einstein, Boris Podolsky and Nathan Rosen published a paper with a
        pointed title: "Can Quantum-Mechanical Description of Physical Reality Be Considered
        Complete?" Their answer was no.
      </p>
      <p>
        Their argument used two particles that had interacted and then flown far apart. Quantum
        mechanics says such particles stay <strong>entangled</strong>: measure one, and you
        instantly know something about the other, no matter how far away it is. Einstein thought
        that was ridiculous. He later called it "spooky action at a distance."
      </p>
      <p>
        The piece that matters for our cat is <strong>superposition</strong>. Say particles A and B
        are entangled so their spins are always opposite. Until you measure A, quantum mechanics
        doesn't say A is "really" spinning one way and we just don't know. It says A is in a
        superposition of both spins at once, and so is B. Measuring A picks an answer for both.
      </p>
      <Callout tone="info">
        Einstein's view: the particles had definite spins all along, and quantum mechanics is just
        missing some information. The EPR paper argued the theory was <em>incomplete</em>, not
        wrong.
      </Callout>
      <p>
        One reader found the paper thrilling: Erwin Schrödinger, whose equation was the beating
        heart of the theory being attacked. He wrote to Einstein right away.
      </p>
      <figure>
        <img
          src={SpookyAction}
          alt="Two cartoon particles looking at each other"
          className="illo w-56"
          width={1128}
          height={1104}
        />
        <figcaption>Entangled, and a little spooked.</figcaption>
      </figure>
    </div>
  );
}
