import Einstein from "../../../assets/einstein.webp";
import Schrodinger from "../../../assets/schrodinger.webp";

export default function TheLetter() {
  return (
    <div className="story-prose">
      <h2>The Letter</h2>
      <p>
        In the summer of 1935, Schrödinger (then at Oxford) and Einstein (newly settled in
        Princeton) traded a series of letters about the EPR paper. Both men had helped build quantum
        mechanics, and both were uneasy about what it seemed to say about reality.
      </p>
      <p>
        In August, Einstein offered an analogy. Imagine a pile of gunpowder that will, at some
        random moment within a year, spontaneously ignite. By the rules of quantum mechanics, before
        you look, the gunpowder's state is a blend of exploded and not-exploded. Einstein wrote:
      </p>
      <blockquote>
        "In reality there is just no intermediary between exploded and not-exploded."
      </blockquote>
      <p>
        His point: the theory describes the <em>statistics</em> of many gunpowder piles, not the
        actual state of one. Something in the description was missing.
      </p>
      <p>
        Schrödinger loved the example and wanted something even more vivid. Gunpowder is a thing.
        What if the thing in the superposition were alive? He replied with a cat, and a vial of
        poison.
      </p>
      <div className="mt-8 flex items-end justify-center gap-12">
        <figure className="!my-0">
          <img src={Einstein} alt="Cartoon Albert Einstein" className="illo w-24 md:w-32" width={1028} height={1202} />
          <figcaption>Einstein</figcaption>
        </figure>
        <figure className="!my-0">
          <img src={Schrodinger} alt="Cartoon Erwin Schrödinger" className="illo w-20 md:w-28" width={762} height={1162} />
          <figcaption>Schrödinger</figcaption>
        </figure>
      </div>
    </div>
  );
}
