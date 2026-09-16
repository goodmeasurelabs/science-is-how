import { useState } from "react";
import Button from "../../../components/Button";
import Face from "../art/Face";
import { dayLabel, dayLabelLong, findMatches, pMatch, pct, randomBirthdays } from "../math";
import { trackInteraction } from "../../../lib/analytics";

const MATCH_COLORS = ["#ff7a59", "#60c2e8", "#7bd389", "#f7c948", "#c084fc", "#f472b6", "#fb923c", "#34d399"];

export default function FillTheRoom() {
  const [n, setN] = useState(23);
  const [birthdays, setBirthdays] = useState<number[] | null>(null);
  const [rooms, setRooms] = useState(0);
  const [hits, setHits] = useState(0);

  const generate = () => {
    const b = randomBirthdays(n);
    setBirthdays(b);
    const matched = findMatches(b).size > 0;
    setRooms((r) => r + 1);
    setHits((h) => h + (matched ? 1 : 0));
    trackInteraction({ story: "birthday-paradox", widget: "fill_room", action: "generate", value: n });
  };

  const matches = birthdays ? findMatches(birthdays) : new Map<number, number[]>();
  const colorOf = new Map<number, string>();
  let ci = 0;
  for (const [day] of matches) colorOf.set(day, MATCH_COLORS[ci++ % MATCH_COLORS.length]);
  const firstMatch = matches.size ? [...matches.entries()][0] : null;

  return (
    <div>
      <div className="story-prose">
        <h2>Fill the Room</h2>
        <p>
          Pick a room size, then hit the button. Every person gets a random birthday. If two of
          them match, they light up in the same color.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-line bg-surface-2 p-5 shadow-card md:p-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <label className="flex w-full flex-col gap-1 md:w-1/2">
            <span className="flex justify-between text-sm font-bold">
              <span>People in the room</span>
              <span className="tabular-nums text-accent">{n}</span>
            </span>
            <input
              type="range"
              min={2}
              max={80}
              value={n}
              onChange={(e) => {
                setN(Number(e.target.value));
                setBirthdays(null);
              }}
              className="accent-[rgb(var(--accent))]"
              aria-label="Number of people in the room"
            />
          </label>
          <div className="text-center md:text-right">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Chance of a match</p>
            <p className="font-display text-3xl font-extrabold tabular-nums">{pct(pMatch(n))}</p>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button variant="primary" size="lg" icon onClick={generate}>
            {birthdays ? "Fill it again" : "Fill the room"}
          </Button>
        </div>

        {birthdays && (
          <>
            <p
              role="status"
              className={`mt-5 rounded-2xl px-4 py-3 text-center font-display text-lg font-bold ${
                firstMatch ? "bg-accent text-white" : "bg-surface text-ink"
              }`}
            >
              {firstMatch
                ? `Match! ${firstMatch[1].length === 2 ? "Two" : firstMatch[1].length} people were born on ${dayLabelLong(firstMatch[0])}${
                    matches.size > 1 ? `, and ${matches.size - 1} more ${matches.size - 1 === 1 ? "day is" : "days are"} shared too` : ""
                  }.`
                : "No match this time. Try again!"}
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="People in the room">
              {birthdays.map((b, i) => {
                const c = colorOf.get(b);
                return (
                  <li key={i} className="flex w-14 flex-col items-center gap-0.5">
                    <Face seed={i * 31 + b} color={c} highlight={!!c} />
                    <span className={`text-[10px] tabular-nums ${c ? "font-bold" : "text-muted"}`} style={c ? { color: c } : undefined}>
                      {dayLabel(b)}
                    </span>
                  </li>
                );
              })}
            </ul>
            {rooms > 1 && (
              <p className="mt-5 text-center text-sm text-muted tabular-nums">
                Rooms filled: {rooms}. Rooms with a match: {hits} ({pct(hits / rooms, 0)}).
                Theory says {pct(pMatch(n), 0)}.
              </p>
            )}
          </>
        )}
      </div>

      <div className="story-prose mt-8">
        <p>
          Try 23 a few times. Try 50. Then try 10 and notice it's <em>still</em> a match about one
          time in nine. Something is making matches far easier to come by than 365 days would
          suggest. That something is pairs.
        </p>
      </div>
    </div>
  );
}
