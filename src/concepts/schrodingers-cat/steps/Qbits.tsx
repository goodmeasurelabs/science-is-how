import Qbit from "../../../assets/qbit.webp";
import Callout from "../../../components/Callout";

export default function Qbits() {
  return (
    <div className="story-prose">
      <h2>Qubits</h2>
      <p>
        Schrödinger's cat wasn't just a joke that got out of hand. It made superposition, a core
        principle of quantum mechanics, impossible to wave away. And superposition is exactly what
        makes <strong>quantum computing</strong> possible.
      </p>
      <p>
        A classical bit is either 0 or 1. A <strong>qubit</strong> can be 0, 1, or a superposition of
        both, like the cat before the box is opened. Measure it and, like the cat, it snaps to one
        answer.
      </p>
      <p>
        Put many qubits together and their superpositions combine, letting a quantum computer
        explore an enormous space of possibilities at once. Clever algorithms then arrange for the
        wrong answers to cancel out and the right one to survive measurement. For certain problems,
        such as factoring huge numbers or simulating molecules, that could beat any classical
        computer ever built.
      </p>
      <Callout tone="fun">
        The famous "quantum computers try every answer at the same time" line is a bit of a cheat.
        If you just measure, you get one random answer, like opening the box. The magic is in
        steering the superposition before you look.
      </Callout>
      <p>The cat, in other words, is still very much alive.</p>
      <figure>
        <img src={Qbit} alt="Cartoon qubit sphere" className="illo w-40" width={902} height={670} />
      </figure>
    </div>
  );
}
