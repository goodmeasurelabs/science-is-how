import type { StoryContent } from "../../content/types";
import Cover from "../../assets/monty-hall.svg";
import TheLetter from "./steps/TheLetter";
import PlayTheGame from "./steps/PlayTheGame";
import WhySwitchingWins from "./steps/WhySwitchingWins";
import TheBacklash from "./steps/TheBacklash";
import RunTheNumbers from "./steps/RunTheNumbers";
import TheFinePrint from "./steps/TheFinePrint";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        You're on a game show. There are three doors. Behind one is a car, behind the other two
        are goats. You pick a door. The host, who knows where the car is, opens one of the{" "}
        <em>other</em> doors and shows you a goat. Then he asks:{" "}
        <strong>"Do you want to switch to the remaining door?"</strong>
      </p>
      <p>
        Most people say it doesn't matter. Two doors left, one car, fifty-fifty. In 1990 a
        magazine columnist said otherwise: switching wins two times out of three. Around ten
        thousand readers wrote in to tell her she was wrong. About a thousand of them had PhDs.
      </p>
      <p>
        She was right. This story is about why, and about how a puzzle simple enough for a game
        show managed to fool one of the greatest mathematicians of the twentieth century.
      </p>
      <figure>
        <img src={Cover} alt="Three cartoon doors, one slightly open with a goat peeking out" className="illo w-56" width={400} height={400} />
        <figcaption>Pick a door. Any door.</figcaption>
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [TheLetter, PlayTheGame, WhySwitchingWins, TheBacklash, RunTheNumbers, TheFinePrint],
};

export default story;
