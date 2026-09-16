import { useState } from "react";
import Button from "../../../components/Button";
import Door from "../art/Door";
import { makeRound, outcome, type Round, type Strategy } from "../game";
import { trackInteraction } from "../../../lib/analytics";
import { useIsMobile } from "../../../lib/useIsMobile";

type Phase = "pick" | "offer" | "reveal";

interface Tally {
  stay: { wins: number; games: number };
  switch: { wins: number; games: number };
}

const emptyTally: Tally = { stay: { wins: 0, games: 0 }, switch: { wins: 0, games: 0 } };

function pct(w: number, g: number) {
  return g === 0 ? "–" : `${Math.round((w / g) * 100)}%`;
}

export default function PlayTheGame() {
  const [phase, setPhase] = useState<Phase>("pick");
  const [round, setRound] = useState<Round | null>(null);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [tally, setTally] = useState<Tally>(emptyTally);
  const isMobile = useIsMobile();

  const pick = (door: number) => {
    setRound(makeRound(door));
    setPhase("offer");
  };

  const decide = (s: Strategy) => {
    if (!round) return;
    const won = outcome(round, s);
    setStrategy(s);
    setPhase("reveal");
    setTally((t) => ({
      ...t,
      [s]: { wins: t[s].wins + (won ? 1 : 0), games: t[s].games + 1 },
    }));
    trackInteraction({ story: "monty-hall", widget: "door_game", action: s, value: won ? "win" : "lose" });
  };

  const again = () => {
    setRound(null);
    setStrategy(null);
    setPhase("pick");
  };

  const finalDoor = round && strategy ? (strategy === "stay" ? round.firstPick : round.other) : null;
  const won = round && strategy ? outcome(round, strategy) : null;
  const totalGames = tally.stay.games + tally.switch.games;

  return (
    <div>
      <div className="story-prose">
        <h2>Play the Game</h2>
        <p>
          One car, two goats. Pick a door. Monty will open a goat door, then you decide: stay with
          your pick, or switch to the other closed door. Play at least ten rounds and try both
          strategies. The tally keeps score.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-line bg-surface-2 p-6 shadow-card">
        <p className="mb-6 min-h-[3rem] text-center font-display text-lg font-bold" aria-live="polite">
          {phase === "pick" && "Pick a door 👇"}
          {phase === "offer" && round && (
            <>
              Monty opens door {round.hostOpens + 1}. It's a goat. <br />
              <span className="font-body text-base font-normal text-muted">
                Stay with door {round.firstPick + 1}, or switch to door {round.other + 1}?
              </span>
            </>
          )}
          {phase === "reveal" && round && (
            <span className={won ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}>
              {won ? "🚗 You won the car!" : "🐐 Goat. Sorry."}{" "}
              <span className="font-body text-base font-normal text-muted">
                (you {strategy === "stay" ? "stayed" : "switched"}; the car was behind door {round.car + 1})
              </span>
            </span>
          )}
        </p>

        <div className="flex items-end justify-center gap-3 pt-6 sm:gap-8">
          {[0, 1, 2].map((d) => {
            const isOpen =
              phase === "reveal" ? true : phase === "offer" && round ? d === round.hostOpens : false;
            const prize = round && d === round.car ? "car" : "goat";
            const isSelected = phase === "pick" ? false : d === (phase === "reveal" ? finalDoor : round?.firstPick);
            return (
              <Door
                key={d}
                number={d + 1}
                open={isOpen}
                prize={prize}
                selected={isSelected}
                dimmed={phase === "offer" && round ? d === round.hostOpens : false}
                onClick={phase === "pick" ? () => pick(d) : undefined}
                size={isMobile ? 84 : 110}
              />
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {phase === "offer" && (
            <>
              <Button variant="secondary" onClick={() => decide("stay")}>
                Stay with door {round!.firstPick + 1}
              </Button>
              <Button variant="primary" onClick={() => decide("switch")}>
                Switch to door {round!.other + 1}
              </Button>
            </>
          )}
          {phase === "reveal" && (
            <Button variant="primary" icon onClick={again}>
              Play again
            </Button>
          )}
        </div>

        <table className="mx-auto mt-8 w-full max-w-sm text-center text-sm tabular-nums">
          <caption className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
            Your tally · {totalGames} {totalGames === 1 ? "game" : "games"}
          </caption>
          <thead>
            <tr className="text-muted">
              <th className="py-1 font-semibold">Strategy</th>
              <th className="py-1 font-semibold">Wins</th>
              <th className="py-1 font-semibold">Games</th>
              <th className="py-1 font-semibold">Win rate</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-line">
              <td className="py-1.5 font-bold">Stay</td>
              <td>{tally.stay.wins}</td>
              <td>{tally.stay.games}</td>
              <td className="font-bold">{pct(tally.stay.wins, tally.stay.games)}</td>
            </tr>
            <tr className="border-t border-line">
              <td className="py-1.5 font-bold text-accent">Switch</td>
              <td>{tally.switch.wins}</td>
              <td>{tally.switch.games}</td>
              <td className="font-bold text-accent">{pct(tally.switch.wins, tally.switch.games)}</td>
            </tr>
          </tbody>
        </table>
        {totalGames > 0 && (
          <div className="mt-3 text-center">
            <Button size="sm" variant="ghost" onClick={() => setTally(emptyTally)}>
              Reset tally
            </Button>
          </div>
        )}
      </div>

      <div className="story-prose mt-8">
        <p>
          A handful of games won't settle anything; luck is loud in small numbers. But if you keep
          going, one row of that table should start pulling ahead. Let's see why.
        </p>
      </div>
    </div>
  );
}
