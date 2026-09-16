import { useMemo, useState } from "react";
import Button from "../../../components/Button";
import { trackInteraction } from "../../../lib/analytics";

const N = 6;

function randomRows(): number[][] {
  return Array.from({ length: N }, () => Array.from({ length: N }, () => Math.floor(Math.random() * 10)));
}

/** Cantor's rule: pick a digit that is different from the one on the diagonal. */
function flip(d: number): number {
  return d === 5 ? 6 : 5;
}

export default function DiagonalWidget() {
  const [rows, setRows] = useState<number[][]>(randomRows);
  const [revealed, setRevealed] = useState(0);
  const [checkRow, setCheckRow] = useState<number | null>(null);

  const diagonal = useMemo(() => rows.map((r, i) => r[i]), [rows]);
  const built = diagonal.map(flip);

  const reveal = () => {
    setRevealed((r) => Math.min(N, r + 1));
    setCheckRow(null);
    trackInteraction({ story: "hilberts-hotel", widget: "diagonal", action: "reveal", value: revealed + 1 });
  };
  const shuffle = () => {
    setRows(randomRows());
    setRevealed(0);
    setCheckRow(null);
    trackInteraction({ story: "hilberts-hotel", widget: "diagonal", action: "shuffle" });
  };
  const check = (i: number) => {
    setCheckRow(i);
    trackInteraction({ story: "hilberts-hotel", widget: "diagonal", action: "check_row", value: i + 1 });
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="rounded-3xl border border-line bg-surface-2 p-4 shadow-card md:p-6">
        <p className="mb-3 text-center text-sm text-muted">
          The bus manifest: passenger n gets room n. Tap a row after building the new number to compare.
        </p>
        <div className="overflow-x-auto">
          <table className="mx-auto border-separate border-spacing-1 font-mono text-base md:text-lg">
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  onClick={() => revealed === N && check(i)}
                  className={`${revealed === N ? "cursor-pointer" : ""} ${checkRow === i ? "bg-accent-2/20" : ""} rounded`}
                >
                  <td className="pr-2 text-right text-xs text-muted">room {i + 1}</td>
                  <td className="text-muted">0.</td>
                  {r.map((d, j) => {
                    const onDiag = i === j;
                    const lit = onDiag && revealed > i;
                    const mismatch = checkRow === i && j === i;
                    return (
                      <td
                        key={j}
                        className={`h-8 w-8 rounded-md text-center transition-colors ${
                          mismatch
                            ? "bg-red-400 font-bold text-white"
                            : lit
                              ? "bg-accent font-bold text-white"
                              : onDiag
                                ? "border border-dashed border-accent/60"
                                : ""
                        }`}
                      >
                        {d}
                      </td>
                    );
                  })}
                  <td className="text-muted">…</td>
                </tr>
              ))}
              <tr>
                <td className="pr-2 text-right text-xs font-bold text-accent">new</td>
                <td className="text-ink">0.</td>
                {built.map((d, j) => (
                  <td
                    key={j}
                    className={`h-8 w-8 rounded-md text-center font-bold transition-all ${
                      j < revealed ? (checkRow === j ? "bg-red-400 text-white" : "bg-ink text-surface") : "border border-line text-transparent"
                    }`}
                  >
                    {j < revealed ? d : "?"}
                  </td>
                ))}
                <td className="text-muted">…</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 min-h-[2.5rem] text-center text-sm text-muted">
          {revealed === 0 && "Rule: walk down the diagonal. Wherever you see a 5, write 6. Otherwise write 5."}
          {revealed > 0 && revealed < N && `Digit ${revealed}: the diagonal digit is ${diagonal[revealed - 1]}, so we write ${built[revealed - 1]}.`}
          {revealed === N && checkRow === null && "Done. Now tap any row: the new number differs from it in at least one place."}
          {checkRow !== null &&
            `Room ${checkRow + 1}'s passenger has ${diagonal[checkRow]} in position ${checkRow + 1}. Our number has ${built[checkRow]} there. Not the same passenger.`}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Button size="sm" variant="primary" onClick={reveal} disabled={revealed === N}>
            {revealed === 0 ? "Build the number" : revealed < N ? "Next digit" : "Built"}
          </Button>
          <Button size="sm" variant="ghost" onClick={shuffle}>
            Shuffle the manifest
          </Button>
        </div>
      </div>
    </div>
  );
}
