import type { StoryContent } from "../../content/types";
import Cover from "../../assets/game-of-life.svg";
import NoPlayers from "./steps/NoPlayers";
import ThreeRules from "./steps/ThreeRules";
import Play from "./steps/Play";
import TheZoo from "./steps/TheZoo";
import TheBet from "./steps/TheBet";
import LifeIsAComputer from "./steps/LifeIsAComputer";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        The Game of Life is a game with no players. You draw some squares on a grid, press go, and
        three tiny rules take over. That's it. Nobody wins.
      </p>
      <p>
        And yet, from those three rules, things <em>emerge</em>: shapes that pulse, shapes that
        crawl across the board, shapes that shoot other shapes, and eventually shapes that can do
        arithmetic. All from squares that only ever look at their eight nearest neighbours.
      </p>
      <p>
        John Conway built it in 1970 to be unpredictable on purpose. It escaped the maths department
        within months, ate more computer time than almost any program of the decade, and quietly
        changed how scientists think about complexity. You'll run it yourself in a couple of steps.
      </p>
      <figure>
        <img src={Cover} alt="A cartoon grid with a glider pattern of coral cells, one of them smiling" className="illo w-56" width={400} height={400} />
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [NoPlayers, ThreeRules, Play, TheZoo, TheBet, LifeIsAComputer],
};

export default story;
