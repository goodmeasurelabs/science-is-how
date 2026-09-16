import Callout from "../../../components/Callout";
import MiniGrid from "../art/MiniGrid";

export default function NoPlayers() {
  return (
    <div className="story-prose">
      <h2>A Game With No Players</h2>
      <p>
        In the late 1960s, John Horton Conway was a young mathematician at Cambridge with a
        reputation for playing games. Not metaphorically. He and his colleagues spent long stretches
        of the day in the department common room inventing games and taking them apart.
      </p>
      <p>
        Conway wanted something specific: a "game" on a grid where each square follows simple
        rules, and yet you <strong>cannot tell what will happen</strong> just by looking. Too
        harsh a rule set and every pattern fizzles out. Too generous and everything explodes into a
        blob. He was hunting for the knife-edge in between.
      </p>
      <p>
        There were no screens to help. The team worked patterns out by hand, generation by
        generation, on Go boards and coffee tables, sliding counters around and tweaking the rules
        for the better part of two years.
      </p>
      <div className="my-6 flex flex-wrap justify-center gap-4">
        <MiniGrid size={5} highlightCenter={false} cells={[0,0,0,0,0, 0,0,1,0,0, 0,0,0,1,0, 0,1,1,1,0, 0,0,0,0,0]} label="A pattern, drawn by hand" />
      </div>
      <p>
        The result was published not in a journal but in Martin Gardner's "Mathematical Games"
        column in <em>Scientific American</em>, October 1970. Gardner later said it drew more
        reader mail than any column he ever wrote. Within a year, people were running Life on
        every computer they could get near, sometimes to the annoyance of their employers.
      </p>
      <Callout tone="history" title="Zero players">
        Conway called it a "zero-player game." You set up the starting position. After that, you
        only watch. The rules make every move.
      </Callout>
    </div>
  );
}
