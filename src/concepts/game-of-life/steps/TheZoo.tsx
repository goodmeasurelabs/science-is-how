import Callout from "../../../components/Callout";
import LifeBoard from "../LifeBoard";
import MiniGrid from "../art/MiniGrid";

export default function TheZoo() {
  return (
    <div className="w-full">
      <div className="story-prose">
        <h2>The Zoo</h2>
        <p>
          Within weeks of Gardner's column, readers had started a catalogue of creatures, and the
          names stuck. Load each one below and press Play.
        </p>
        <div className="my-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MiniGrid size={4} highlightCenter={false} cells={[0,0,0,0, 0,1,1,0, 0,1,1,0, 0,0,0,0]} label="Block: a still life" />
          <MiniGrid size={5} highlightCenter={false} cells={[0,0,0,0,0, 0,0,0,0,0, 0,1,1,1,0, 0,0,0,0,0, 0,0,0,0,0]} label="Blinker: period 2" />
          <MiniGrid size={5} highlightCenter={false} cells={[0,0,0,0,0, 0,0,1,0,0, 0,0,0,1,0, 0,1,1,1,0, 0,0,0,0,0]} label="Glider: it walks" />
          <MiniGrid size={5} highlightCenter={false} cells={[0,0,0,0,0, 0,0,1,1,0, 0,1,1,0,0, 0,0,1,0,0, 0,0,0,0,0]} label="R-pentomino: chaos" />
        </div>
        <ul>
          <li>
            <strong>Still lifes</strong> like the block never change. Every live cell has 2 or 3
            neighbours and no dead cell has exactly 3.
          </li>
          <li>
            <strong>Oscillators</strong> like the blinker repeat. Three in a row becomes three in a
            column, then back again, forever.
          </li>
          <li>
            <strong>Spaceships</strong> move. The glider shuffles one cell diagonally every four
            generations, and on a wrapping board it never stops.
          </li>
          <li>
            The <strong>R-pentomino</strong> is only five cells, but it churns for 1,103
            generations, throwing off gliders and leaving debris everywhere, before it finally
            settles. Conway's group could not finish it by hand.
          </li>
        </ul>
      </div>
      <div className="mt-6">
        <LifeBoard initial="glider" />
      </div>
      <div className="story-prose mt-8">
        <Callout tone="fun">
          The glider is the unofficial emblem of hackers everywhere. It was proposed as such in 2003
          precisely because it's simple, moves, and comes from a game where complexity grows out of
          simple rules.
        </Callout>
      </div>
    </div>
  );
}
