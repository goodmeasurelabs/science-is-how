import BridgeMap from "../BridgeMap";
import Callout from "../../../components/Callout";

export default function WhatItStarted() {
  return (
    <>
      <div className="story-prose">
        <h2>What It Started</h2>
        <p>
          Euler's paper is usually called the birth of <strong>graph theory</strong>, the mathematics
          of dots and the lines between them. It's also an early ancestor of{" "}
          <strong>topology</strong>, the study of shapes where only connections matter, not
          distances.
        </p>
        <p>
          That "only connections matter" idea turned out to be one of the most useful in all of
          science. Graphs are how we model:
        </p>
        <ul>
          <li>road maps and the routing in your phone's directions,</li>
          <li>the internet, where dots are computers and lines are cables,</li>
          <li>social networks, where the lines are friendships,</li>
          <li>molecules, where atoms are dots and bonds are lines,</li>
          <li>
            and delivery routes, snow ploughs and street sweepers, which all want to cover every
            street exactly once. That's literally Euler's problem, now called the{" "}
            <em>Chinese postman problem</em>.
          </li>
        </ul>
        <Callout tone="history" title="What happened to the bridges">
          Two of the seven were destroyed in the bombing of Königsberg in 1944 and 1945. Two more
          were later demolished and replaced by a single modern road bridge. The city is now
          Kaliningrad, Russia, and it has five bridges connecting the same four pieces of land.
          Count the odd dots and you'll find there are exactly two. A walk crossing every bridge
          once is finally possible, starting on one island and ending on the other. A round trip
          still isn't.
        </Callout>
        <h3>Bonus: the eighth bridge</h3>
        <p>
          In 1905 the city built an eighth bridge, the Kaiserbrücke, joining Lomse to the south
          bank. That gave Lomse four bridges and the south bank four. Only two odd spots left.
          Euler's rule says a walk now exists, starting at one of the odd spots and ending at the
          other. Can you find it?
        </p>
      </div>
      <div className="mt-6">
        <BridgeMap extraBridge showToggle widget="bridge_walk_eight" />
      </div>
      <div className="story-prose mt-8">
        <p>
          Hint: the odd spots are the north bank (3) and Kneiphof (5). Start on one, finish on the
          other. If you get stuck, flip to Euler's view. The dots don't lie.
        </p>
      </div>
    </>
  );
}
