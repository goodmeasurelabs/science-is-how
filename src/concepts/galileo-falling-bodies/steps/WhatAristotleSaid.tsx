import Callout from "../../../components/Callout";
import { Ball, Feather, Philosopher } from "../art/Objects";

export default function WhatAristotleSaid() {
  return (
    <div className="story-prose">
      <h2>What Aristotle Said</h2>
      <p>
        Around 350 BC, Aristotle wrote down a rule that feels obviously true: heavier things fall
        faster than lighter things. Drop a stone and a leaf. The stone thuds, the leaf drifts. Case
        closed.
      </p>
      <p>
        Aristotle went further. He claimed the speed of a falling object is <em>proportional to its
        weight</em>. A ten-pound stone should reach the ground ten times faster than a one-pound
        stone. Nobody bothered to check, because who argues with a leaf?
      </p>
      <div className="my-8 flex items-end justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Philosopher />
          <span className="text-sm text-muted">Aristotle</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Ball size={52} />
          <span className="text-xs font-bold text-muted">"Fast"</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Feather size={52} />
          <span className="text-xs font-bold text-muted">"Slow"</span>
        </div>
      </div>
      <p>
        The rule held for nearly two thousand years. It was taught in every university in Europe.
        It matched everyday experience. And it was wrong.
      </p>
      <Callout tone="history">
        Aristotle wasn't lazy. He did try to explain <em>why</em>: he thought objects fell because
        they were seeking their "natural place," and more earthy stuff sought it more eagerly. The
        idea of testing a rule with a measured experiment simply wasn't part of the toolkit yet.
      </Callout>
    </div>
  );
}
