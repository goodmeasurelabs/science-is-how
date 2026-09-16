import Callout from "../../../components/Callout";

export default function BiggerInfinities() {
  return (
    <div className="story-prose">
      <h2>Bigger Infinities</h2>
      <p>
        So there are at least two sizes of infinity. The countable kind, which is the whole numbers,
        the evens, the integers, the fractions, and every bus the hotel has ever absorbed. And the
        size of the real numbers, which is strictly bigger. Cantor called the first size ℵ₀
        ("aleph-null") and showed there's an endless ladder of bigger ones above it.
      </p>
      <p>
        This is why "infinity" alone isn't a good enough answer to "how many?" It's a bit like
        answering "big." The hotel's real lesson is that infinite collections have to be compared
        by pairing, not by intuition, and that pairing can give answers no intuition would.
      </p>
      <Callout tone="info" title="Where it shows up now">
        The diagonal trick is the engine behind some of the biggest results of the twentieth century.
        Gödel used a version of it to show that arithmetic contains true statements it can never
        prove. Turing used it to show that no program can decide, in general, whether another
        program will ever finish. Every time a computer scientist says "that problem is
        undecidable," Cantor's diagonal is somewhere underneath.
      </Callout>
      <p>
        Hilbert's hotel, meanwhile, is still open, still full, and still has a room for you. Unless
        you happen to be a real number.
      </p>
    </div>
  );
}
