import type { StoryContent } from "../../content/types";
import Cover from "../../assets/eratosthenes.svg";
import TheLibrarian from "./steps/TheLibrarian";
import RoundEarth from "./steps/RoundEarth";
import TheWell from "./steps/TheWell";
import TwoSticks from "./steps/TwoSticks";
import DoingTheMath from "./steps/DoingTheMath";
import WhatItStarted from "./steps/WhatItStarted";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        Around 240 BC, a librarian in Alexandria worked out the size of the entire Earth. He had no
        telescope, no map of the world, and no way to travel more than a few hundred kilometres
        from home. He had a stick, a shadow, and a story about a well.
      </p>
      <p>
        His answer was within a few percent of the real value. It stood as the best measurement of
        the planet for well over a thousand years, and when people eventually ignored it in favour
        of a smaller number, Columbus sailed west expecting to hit Japan.
      </p>
      <p>
        This is the story of Eratosthenes, and of one of the most elegant experiments ever done.
        You'll get to run it yourself.
      </p>
      <figure>
        <img src={Cover} alt="A cartoon globe with a sun, two sticks and a shadow" className="illo w-56" width={512} height={512} />
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [TheLibrarian, RoundEarth, TheWell, TwoSticks, DoingTheMath, WhatItStarted],
};

export default story;
