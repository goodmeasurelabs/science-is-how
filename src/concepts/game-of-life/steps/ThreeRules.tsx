import MiniSteps from "../../../components/MiniSteps";
import Callout from "../../../components/Callout";
import MiniGrid from "../art/MiniGrid";
import { trackInteraction } from "../../../lib/analytics";

function Scene({ title, text, before, after, beforeLabel, afterLabel }: {
  title: string;
  text: string;
  before: number[];
  after: number[];
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="font-display text-lg font-bold">{title}</p>
      <div className="flex items-center gap-4">
        <MiniGrid cells={before} label={beforeLabel} />
        <span className="text-2xl text-muted" aria-hidden>→</span>
        <MiniGrid cells={after} label={afterLabel} />
      </div>
      <p className="max-w-md text-sm">{text}</p>
    </div>
  );
}

export default function ThreeRules() {
  return (
    <div className="story-prose">
      <h2>The Three Rules</h2>
      <p>
        The board is a grid of square <strong>cells</strong>. Each cell is either alive (filled)
        or dead (empty). Time moves in ticks called <strong>generations</strong>. At every tick,
        each cell counts its eight neighbours: up, down, left, right, and the four diagonals. Then
        exactly one of three things happens.
      </p>
      <MiniSteps
        className="mt-6"
        onChange={(i) => trackInteraction({ story: "game-of-life", widget: "rules", action: "scene", value: i })}
        scenes={[
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-display text-lg font-bold">Meet the cell in the middle</p>
            <MiniGrid cells={[1,0,1, 0,1,0, 0,1,0]} label="The dashed cell has 3 live neighbours" />
            <p className="max-w-md text-sm">
              We'll watch the dashed cell. It looks at the eight cells around it and counts how
              many are alive. Here: three. Click Ok to see the rules one by one.
            </p>
          </div>,
          <Scene
            title="Rule 1: Survival"
            text="A live cell with two or three live neighbours stays alive. It has company, but not too much."
            before={[1,0,0, 0,1,1, 0,0,0]}
            after={[1,0,0, 0,1,1, 0,0,0]}
            beforeLabel="Alive, 2 neighbours"
            afterLabel="Still alive"
          />,
          <Scene
            title="Rule 2: Death"
            text="A live cell with fewer than two live neighbours dies of loneliness. One with more than three dies of overcrowding."
            before={[1,1,1, 1,1,0, 0,1,0]}
            after={[1,1,1, 1,0,0, 0,1,0]}
            beforeLabel="Alive, 5 neighbours"
            afterLabel="Dead (overcrowded)"
          />,
          <Scene
            title="Rule 3: Birth"
            text="A dead cell with exactly three live neighbours comes to life. Three parents, one baby."
            before={[1,0,0, 0,0,1, 1,0,0]}
            after={[1,0,0, 0,1,1, 1,0,0]}
            beforeLabel="Dead, 3 neighbours"
            afterLabel="Born!"
          />,
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-display text-lg font-bold">That's the whole game.</p>
            <p className="max-w-md text-sm">
              Every cell applies its rule at the same instant, using the old board to decide the
              new one. Then the board is redrawn, the clock ticks, and it all happens again.
            </p>
          </div>,
        ]}
      />
      <Callout tone="info" title="Why these numbers?">
        Conway tried many variants. "Two or three to survive, exactly three to be born" was the
        one where patterns neither reliably died nor reliably exploded. It was the knife-edge he'd
        been looking for.
      </Callout>
    </div>
  );
}
