import MiniSteps from "../../../components/MiniSteps";
import Callout from "../../../components/Callout";
import { trackInteraction } from "../../../lib/analytics";

/** 100 little doors; the highlighted ones are the ones still closed. */
function HundredDoors({ open, pick }: { open: boolean; pick: number }) {
  const car = 73;
  return (
    <div
      className="mx-auto grid max-w-md grid-cols-10 gap-1"
      role="img"
      aria-label={open ? "100 doors, 98 open showing goats, doors 1 and 74 still closed" : "100 closed doors"}
    >
      {Array.from({ length: 100 }, (_, i) => {
        const closed = !open || i === pick || i === car;
        return (
          <div
            key={i}
            className={`flex aspect-[3/4] items-center justify-center rounded-sm text-[9px] font-bold ${
              closed
                ? i === pick
                  ? "bg-accent text-white ring-2 ring-accent"
                  : "bg-[#f8d9c4] text-[#2b2033]"
                : "bg-line/60 text-muted"
            }`}
          >
            {closed ? i + 1 : "🐐"}
          </div>
        );
      })}
    </div>
  );
}

function Tree() {
  const row = (label: string, first: string, stay: string, sw: string, stayWin: boolean) => (
    <tr className="border-t border-line">
      <td className="py-2 pr-2 text-left">{label}</td>
      <td className="py-2 text-center">{first}</td>
      <td className={`py-2 text-center font-bold ${stayWin ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>{stay}</td>
      <td className={`py-2 text-center font-bold ${!stayWin ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>{sw}</td>
    </tr>
  );
  return (
    <table className="mx-auto w-full max-w-md text-sm">
      <caption className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
        You always pick door 1. The car is equally likely behind each door.
      </caption>
      <thead>
        <tr className="text-muted">
          <th className="pb-1 text-left font-semibold">Car is behind</th>
          <th className="pb-1 font-semibold">Monty opens</th>
          <th className="pb-1 font-semibold">Stay</th>
          <th className="pb-1 font-semibold">Switch</th>
        </tr>
      </thead>
      <tbody>
        {row("Door 1 (⅓)", "2 or 3", "🚗 win", "🐐 lose", true)}
        {row("Door 2 (⅓)", "3", "🐐 lose", "🚗 win", false)}
        {row("Door 3 (⅓)", "2", "🐐 lose", "🚗 win", false)}
        <tr className="border-t-2 border-ink/30 font-bold">
          <td className="py-2 text-left" colSpan={2}>
            Total
          </td>
          <td className="py-2 text-center">⅓</td>
          <td className="py-2 text-center text-accent">⅔</td>
        </tr>
      </tbody>
    </table>
  );
}

export default function WhySwitchingWins() {
  return (
    <div className="story-prose">
      <h2>Why Switching Wins</h2>
      <p>
        The trap is the phrase "two doors left." It's true, but the two doors are not equal,
        because Monty's move wasn't random. He <strong>knows</strong> where the car is, and he will{" "}
        <strong>never</strong> open it. His choice leaks information.
      </p>
      <p>Here's the cleanest way to feel it. Make the game bigger.</p>
      <MiniSteps
        className="mt-2"
        onChange={(i) => trackInteraction({ story: "monty-hall", widget: "hundred_doors", action: "scene", value: i })}
        scenes={[
          <div>
            <p className="mb-3 text-center">
              100 doors. One car, 99 goats. You pick door 1. How confident are you? About 1%.
            </p>
            <HundredDoors open={false} pick={0} />
          </div>,
          <div>
            <p className="mb-3 text-center">
              Monty, who knows where the car is, opens 98 doors. All goats. He leaves your door
              and door 74 closed.
            </p>
            <HundredDoors open={true} pick={0} />
          </div>,
          <div>
            <p className="mb-3 text-center font-bold">Do you switch to door 74?</p>
            <HundredDoors open={true} pick={0} />
            <p className="mt-3 text-center">
              Of course you do. Your 1% guess is still a 1% guess. Monty just took the other 99%
              and squeezed it into one door. The three-door game is the same thing, only the
              squeeze is from 67% into one door instead of 99%.
            </p>
          </div>,
        ]}
      />
      <h3>The full accounting</h3>
      <p>
        With three doors, list every case. Your first pick is right one time in three. Switching
        wins in <em>exactly</em> the cases where your first pick was wrong, and that's two times in
        three.
      </p>
      <Tree />
      <Callout tone="info" title="The one-sentence version">
        Staying wins if your first guess was right (⅓). Switching wins if your first guess was
        wrong (⅔). Monty's goat reveal never changes which of those you're in; it just tells you
        where to switch <em>to</em>.
      </Callout>
    </div>
  );
}
