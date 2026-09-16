import type { StoryContent } from "../../content/types";
import Cover from "../../assets/hilberts-hotel.svg";
import Callout from "../../components/Callout";
import FullHotel from "./steps/FullHotel";
import InfiniteBus from "./steps/InfiniteBus";
import InfinitelyManyBuses from "./steps/InfinitelyManyBuses";
import WhatCantorSaw from "./steps/WhatCantorSaw";
import BusThatDoesntFit from "./steps/BusThatDoesntFit";
import BiggerInfinities from "./steps/BiggerInfinities";

function Intro() {
  return (
    <div className="story-prose">
      <h2>What is it?</h2>
      <p>
        Imagine a hotel with <strong>infinitely many rooms</strong>, numbered 1, 2, 3 and so on
        forever. Tonight every single room is taken. A traveler walks in and asks for a bed.
      </p>
      <p>
        At a normal hotel the answer is "sorry, we're full." At this hotel the manager just smiles
        and picks up the intercom.
      </p>
      <p>
        David Hilbert, one of the most influential mathematicians of the twentieth century, used this
        hotel in a 1924 lecture in Göttingen titled "On the Infinite" to show how badly our everyday
        instincts fail once infinity gets involved. Physicist George Gamow retold it in his 1947
        book <em>One Two Three... Infinity</em>, and it has been the standard tour of the infinite
        ever since.
      </p>
      <Callout tone="info">
        The hotel is a story about one question: when are two infinite collections the same size?
        Georg Cantor answered it in the 1870s, and his answer upset a lot of people.
      </Callout>
      <p>Let's check in.</p>
      <figure>
        <img src={Cover} alt="A cartoon hotel with a row of doors and an infinity sign on its sign" className="illo w-56" width={400} height={400} />
      </figure>
    </div>
  );
}

const story: StoryContent = {
  Intro,
  steps: [FullHotel, InfiniteBus, InfinitelyManyBuses, WhatCantorSaw, BusThatDoesntFit, BiggerInfinities],
};

export default story;
