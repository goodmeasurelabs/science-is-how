import type { StoryContent } from "../../content/types";
import Cover from "../../assets/galileo-falling-bodies.svg";
import WhatAristotleSaid from "./steps/WhatAristotleSaid";
import TheTwoStones from "./steps/TheTwoStones";
import DropTestStep from "./steps/DropTestStep";
import RollingDownhill from "./steps/RollingDownhill";
import TheMoon from "./steps/TheMoon";
import WhyItMattered from "./steps/WhyItMattered";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        Drop a bowling ball and a feather at the same time. Which hits the ground first? Everyone
        knows the answer, and for two thousand years everyone drew the wrong conclusion from it.
      </p>
      <p>
        Aristotle taught that heavier objects fall faster. In 1589 a young mathematics lecturer in
        Pisa named <strong>Galileo Galilei</strong> showed, with nothing more than a thought
        experiment about two stones tied together, that this couldn't be right. Then he built
        experiments to find out what falling things actually do.
      </p>
      <p>
        This is the story of how that argument went, why the famous Leaning Tower scene probably
        never happened, and how an astronaut finally ran Galileo's experiment on the Moon in front
        of a live TV audience.
      </p>
      <figure>
        <img
          src={Cover}
          alt="A cartoon leaning tower with a ball and a feather falling beside it"
          className="illo w-56"
          width={400}
          height={400}
        />
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [WhatAristotleSaid, TheTwoStones, DropTestStep, RollingDownhill, TheMoon, WhyItMattered],
};

export default story;
