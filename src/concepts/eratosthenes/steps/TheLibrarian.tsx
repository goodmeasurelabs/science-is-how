import Callout from "../../../components/Callout";
import Sieve from "../art/Sieve";

export default function TheLibrarian() {
  return (
    <div className="story-prose">
      <h2>The Librarian</h2>
      <p>
        Eratosthenes was born around 276 BC in Cyrene, a Greek city on the coast of what is now
        Libya. He studied in Athens, and around 245 BC the ruler of Egypt, Ptolemy III, invited
        him to Alexandria to run the greatest library in the world.
      </p>
      <p>
        He was a poet, a historian, a mathematician, a geographer and an astronomer. His rivals
        had a nickname for a man who was good at everything: <strong>"Beta."</strong> Second letter
        of the alphabet, second-best at everything. It was meant as an insult. It has aged rather
        well.
      </p>
      <p>
        As head of the Library, Eratosthenes had access to every scroll, traveller's report and
        survey in the known world. That mattered, because the measurement that made him famous
        was built from other people's observations, stitched together with one clean idea.
      </p>
      <Callout tone="fun" title="Beta's other greatest hit">
        Eratosthenes also gave us the <strong>sieve</strong> for finding prime numbers: write out
        the numbers, keep the first one, cross out its multiples, repeat. Programmers still use it.
        Try it below.
      </Callout>
      <Sieve />
    </div>
  );
}
