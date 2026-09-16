import Callout from "../../../components/Callout";
import MiniGrid from "../art/MiniGrid";

export default function LifeIsAComputer() {
  return (
    <div className="story-prose">
      <h2>Life Is a Computer</h2>
      <p>
        Once you have guns, you have streams of gliders. Aim two streams at each other and they
        annihilate. Arrange it carefully and a glider stream becomes a signal: glider present means
        1, absent means 0. Collide streams in the right places and you get an AND gate, an OR gate,
        a NOT gate.
      </p>
      <p>
        From logic gates you can build memory, adders, and eventually a whole processor. People
        have. The Game of Life is <strong>Turing complete</strong>: anything a computer can
        calculate, a large enough Life board can calculate too, one glider collision at a time.
        Somebody even built a Life pattern that runs the Game of Life.
      </p>
      <div className="my-6 flex justify-center">
        <MiniGrid
          size={7}
          highlightCenter={false}
          cells={[
            0,1,0,0,0,0,0,
            0,0,1,0,0,0,0,
            1,1,1,0,0,0,0,
            0,0,0,0,0,0,0,
            0,0,0,0,1,1,1,
            0,0,0,0,1,0,0,
            0,0,0,0,0,1,0,
          ]}
          label="Two gliders on a collision course: a bit, and the gate that reads it"
        />
      </div>
      <p>
        That's the deeper lesson, and the reason Life outgrew the puzzle page. Nothing in the three
        rules mentions gliders, guns or logic. They <strong>emerge</strong>. Simple local rules,
        applied everywhere at once, produce global behaviour nobody wrote down. Biologists use the
        same idea to model how cells form tissues, physicists to model magnets and fluids, planners
        to model traffic jams and the spread of cities. The field it started, cellular automata,
        is now a standard tool.
      </p>
      <Callout tone="history" title="Conway and his monster">
        Conway went on to do celebrated work in group theory, knot theory and number theory, and
        invented the surreal numbers. He grew a little tired of being introduced as "the Game of
        Life guy." He died in April 2020, of COVID-19, at 82. The gliders are still walking.
      </Callout>
      <p>
        Go back to the board, draw something ugly, and press Play. You already know the rules. You
        still can't say what will happen. That's the point.
      </p>
    </div>
  );
}
