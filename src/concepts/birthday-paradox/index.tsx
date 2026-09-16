import type { StoryContent } from "../../content/types";
import Callout from "../../components/Callout";
import Cake from "./art/Cake";
import TheBet from "./steps/TheBet";
import FillTheRoom from "./steps/FillTheRoom";
import CountingPairs from "./steps/CountingPairs";
import TheMath from "./steps/TheMath";
import RunItAThousandTimes from "./steps/RunItAThousandTimes";
import BirthdayAttacks from "./steps/BirthdayAttacks";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        How many people do you need in a room before it's more likely than not that two of them
        share a birthday? There are 365 days in a year, so the gut says something like 180.
      </p>
      <p>
        The answer is <strong>23</strong>. With 23 people the odds of a shared birthday are a hair
        over 50%. With 50 people they're 97%. With 70, you'd have to be very unlucky <em>not</em>{" "}
        to find a match.
      </p>
      <p>
        It's called the Birthday Paradox, but nothing about it is contradictory. The math is
        airtight. It's your intuition that's broken, and by the end of this story you'll know
        exactly where.
      </p>
      <Callout tone="history" title="Who asked first?">
        The problem is usually credited to the Austrian mathematician Richard von Mises, who worked
        it out in a 1939 paper. The British number theorist Harold Davenport is said to have played
        with it earlier but never published. Either way, it has been ruining bar bets ever since.
      </Callout>
      <figure>
        <Cake className="w-44" />
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [TheBet, FillTheRoom, CountingPairs, TheMath, RunItAThousandTimes, BirthdayAttacks],
};

export default story;
