import { useState } from "react";
import Button from "../../../components/Button";
import PartyCat from "../../../assets/party-cat.webp";
import DeadCat from "../../../assets/dead-cat.webp";
import ZombieCat from "../../../assets/zombie-cat.webp";
import BoxOpen from "../../../assets/box-open.webp";
import BoxClosed from "../../../assets/box-closed.webp";
import { trackInteraction } from "../../../lib/analytics";
import "./CatAnalogyInteractive.css";

type CatState = "alive" | "dead" | "deadAndAlive";

const outcomes: Record<CatState, { title: string; src: string; alt: string; cls: string }> = {
  alive: { title: "The cat is alive! 🎉", src: PartyCat, alt: "A cat in a party hat", cls: "party" },
  dead: { title: "The cat is dead. 💀", src: DeadCat, alt: "A cat lying on its back", cls: "dead" },
  deadAndAlive: {
    title: "The cat is both dead and alive 🧟",
    src: ZombieCat,
    alt: "A zombie cat, half alive and half dead",
    cls: "zombie",
  },
};

export default function CatAnalogyInteractive() {
  const [catState, setCatState] = useState<CatState>("deadAndAlive");
  const [tally, setTally] = useState({ alive: 0, dead: 0 });

  const openBox = () => {
    const result: CatState = Math.random() < 0.5 ? "alive" : "dead";
    setCatState(result);
    setTally((t) => ({ ...t, [result]: t[result] + 1 }));
    trackInteraction({ story: "schrodingers-cat", widget: "cat_box", action: "open", value: result });
  };
  const closeBox = () => setCatState("deadAndAlive");

  const o = outcomes[catState];
  const opened = tally.alive + tally.dead;

  return (
    <div className="story-prose">
      <h2>Open the Box</h2>
      <p>
        Let's run the experiment. The box below is sealed with the cat and the atom inside. While
        it's closed, the theory describes the cat as both alive and dead. Open it to force an
        answer.
      </p>

      <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-around">
        <div className="relative h-48 w-48 shrink-0">
          {catState === "dead" && <div className="stench" aria-hidden />}
          {catState === "alive" && (
            <div className="meow" aria-hidden>
              Meow!
            </div>
          )}
          <img
            src={catState === "deadAndAlive" ? BoxClosed : BoxOpen}
            alt={catState === "deadAndAlive" ? "A closed cardboard box" : "An open cardboard box"}
            className={`box-image ${catState}`}
            width={652}
            height={592}
          />
        </div>
        <div className="flex min-h-[16rem] w-56 flex-col items-center text-center">
          <p className="font-display text-lg font-bold">{o.title}</p>
          <div className="relative mt-3 h-44 w-44">
            <img src={o.src} alt={o.alt} className={`h-44 w-44 object-contain ${o.cls}`} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        {catState === "deadAndAlive" ? (
          <Button variant="primary" size="lg" icon onClick={openBox}>
            Open the box
          </Button>
        ) : (
          <Button size="lg" icon onClick={closeBox}>
            Close the box and reset
          </Button>
        )}
        {opened > 0 && (
          <p className="text-sm text-muted tabular-nums">
            Opened {opened} {opened === 1 ? "time" : "times"}: {tally.alive} alive, {tally.dead} dead.
          </p>
        )}
      </div>
      {opened >= 5 && (
        <p className="mt-6">
          Notice that each opening is a coin flip, but the theory never tells you which way it will
          land. It only tells you the odds. That's the "statistics of an ensemble" Einstein was
          talking about, and the mystery Schrödinger wanted to make impossible to ignore.
        </p>
      )}
    </div>
  );
}
