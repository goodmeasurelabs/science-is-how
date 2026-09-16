import Callout from "../../../components/Callout";

function Pairing({ top, bottom, label }: { top: string[]; bottom: string[]; label: string }) {
  return (
    <div className="my-4 overflow-x-auto rounded-2xl bg-surface-2 p-4 shadow-card">
      <p className="mb-2 text-center font-display text-sm font-bold">{label}</p>
      <table className="mx-auto text-center font-mono">
        <tbody>
          <tr>
            {top.map((t, i) => (
              <td key={i} className="px-2 py-1">
                {t}
              </td>
            ))}
            <td className="px-2 text-muted">…</td>
          </tr>
          <tr>
            {top.map((_, i) => (
              <td key={i} className="text-accent">
                ↕
              </td>
            ))}
            <td />
          </tr>
          <tr>
            {bottom.map((b, i) => (
              <td key={i} className="px-2 py-1">
                {b}
              </td>
            ))}
            <td className="px-2 text-muted">…</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function WhatCantorSaw() {
  return (
    <div className="story-prose">
      <h2>What Cantor Saw</h2>
      <p>
        Fifty years before Hilbert's lecture, Georg Cantor asked what it even means for two
        collections to be "the same size" when you can't count them. His answer was the one a
        child uses before learning numbers:
      </p>
      <blockquote>
        Two collections are the same size if you can pair them up, one to one, with nobody left over
        on either side.
      </blockquote>
      <p>
        That's exactly what the hotel does. Each trick is a pairing between "the old guests plus the
        new arrivals" and "the rooms." Room n → 2n pairs the counting numbers with the even numbers,
        with nothing left over. So by Cantor's rule, there are exactly as many even numbers as there
        are whole numbers.
      </p>
      <Pairing label="Whole numbers and even numbers" top={["1", "2", "3", "4", "5"]} bottom={["2", "4", "6", "8", "10"]} />
      <Pairing label="Whole numbers and integers (zigzag)" top={["1", "2", "3", "4", "5"]} bottom={["0", "1", "−1", "2", "−2"]} />
      <p>
        Cantor pushed further. The fractions look far more numerous than the whole numbers, since
        infinitely many of them sit between 0 and 1 alone. But he found a way to list them, every
        one, in a single infinite line. So the fractions are the same size too. He called any
        collection that can be lined up like this <strong>countably infinite</strong>.
      </p>
      <Callout tone="history" title="Not everyone was thrilled">
        Leopold Kronecker, a senior mathematician in Berlin, thought Cantor's infinities were
        nonsense and worked to keep his papers out of print and his career out of Berlin. Cantor
        struggled with depression for much of his later life. Hilbert, by contrast, defended him
        with one of mathematics' great lines: "No one shall expel us from the paradise that Cantor
        has created."
      </Callout>
      <p>
        So is every infinity countable? Does every bus fit in the hotel? Cantor found the answer in
        1891, and it is the best trick in this story.
      </p>
    </div>
  );
}
