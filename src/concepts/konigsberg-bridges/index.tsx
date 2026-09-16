import type { StoryContent } from "../../content/types";
import Cover from "../../assets/konigsberg-bridges.svg";
import SundayPuzzle from "./steps/SundayPuzzle";
import TryIt from "./steps/TryIt";
import EulersLetter from "./steps/EulersLetter";
import DotsAndLines from "./steps/DotsAndLines";
import TheRule from "./steps/TheRule";
import WhatItStarted from "./steps/WhatItStarted";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        In the 1730s the people of Königsberg had a favourite puzzle. Their city was split by a
        river into four pieces of land, joined by seven bridges. Could you take a walk that crossed
        every bridge exactly once?
      </p>
      <p>
        Nobody could do it. Nobody could say why. Then the question landed on the desk of Leonhard
        Euler, the most productive mathematician who ever lived, and he did something odd: instead
        of looking for a route, he proved that <strong>no route could exist</strong>, using an
        argument so simple you can check it on your fingers.
      </p>
      <p>
        Along the way he invented a whole new kind of mathematics. It now runs your maps app, your
        social network, and the internet itself. First, though, you'll want to try the puzzle.
      </p>
      <figure>
        <img src={Cover} alt="Cartoon map of a river with two islands and seven little bridges" className="illo w-56" width={400} height={400} />
        <figcaption>Two banks, two islands, seven bridges, one Sunday afternoon.</figcaption>
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [SundayPuzzle, TryIt, EulersLetter, DotsAndLines, TheRule, WhatItStarted],
};

export default story;
