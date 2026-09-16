import { useState } from "react";
import BridgeMap from "../BridgeMap";
import MiniSteps from "../../../components/MiniSteps";
import Callout from "../../../components/Callout";
import { trackInteraction } from "../../../lib/analytics";

function Scene({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-surface-2 p-5 text-left shadow-card">
      <p className="font-display text-lg font-bold">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function DotsAndLines() {
  const [view, setView] = useState<"map" | "graph">("map");
  return (
    <>
      <div className="story-prose">
        <h2>Dots and Lines</h2>
        <p>
          Euler's first move was to throw away the map. The size of the islands, the bends of the
          river, the length of each bridge: none of it matters to the puzzle. All that matters is{" "}
          <strong>which pieces of land are joined to which</strong>.
        </p>
        <p>
          So shrink every piece of land to a dot, and draw every bridge as a line between two dots.
          Press the button to see what Euler saw.
        </p>
      </div>
      <div className="mt-6">
        <div className="mb-3 flex justify-center">
          <button
            type="button"
            onClick={() => {
              const next = view === "map" ? "graph" : "map";
              setView(next);
              trackInteraction({ story: "konigsberg-bridges", widget: "map_graph_toggle", action: "toggle", value: next });
            }}
            className="rounded-full border-2 border-accent bg-surface-2 px-5 py-2 font-display font-bold text-ink transition-colors hover:bg-accent/10"
          >
            {view === "map" ? "Show Euler's view" : "Show the map"}
          </button>
        </div>
        <BridgeMap key={view} interactive={false} initialView={view} showDegrees />
      </div>
      <div className="story-prose mt-8">
        <p>
          Today we call this picture a <strong>graph</strong>: dots (vertices) joined by lines
          (edges). The number of lines touching a dot is its <strong>degree</strong>. Kneiphof has
          degree 5. The other three each have degree 3.
        </p>
        <p>Now think about what a successful walk would look like, one dot at a time.</p>
        <MiniSteps
          nextLabel="Ok"
          onChange={(i) => trackInteraction({ story: "konigsberg-bridges", widget: "in_out_argument", action: "scene", value: i })}
          scenes={[
            <p className="text-center text-muted">Click Ok to follow Euler's argument.</p>,
            <Scene title="Every visit uses two bridges.">
              Suppose your walk passes through some piece of land in the middle of the route. You
              arrived by one bridge. You have to leave by a different one (you can't reuse the one
              you came in on). So each pass-through visit uses up <strong>two</strong> bridges.
            </Scene>,
            <Scene title="So a middle stop needs an even number of bridges.">
              Visit it once: two bridges. Twice: four. Three times: six. If a piece of land has an{" "}
              <em>odd</em> number of bridges, then after you've paired them up there's always one
              left over, and the only way to use it is to arrive and never leave, or leave and never
              come back.
            </Scene>,
            <Scene title="Only the start and the end are allowed to be odd.">
              Where you begin, you leave without having arrived. Where you finish, you arrive without
              leaving. Those two spots can have an odd number of bridges. Everywhere else must be
              even.
            </Scene>,
            <Scene title="Königsberg has four odd spots.">
              5, 3, 3 and 3. All odd. A walk can only cope with two of them. So no matter where you
              start, no matter how clever your route, you will get stuck.{" "}
              <strong>The puzzle has no solution.</strong>
            </Scene>,
          ]}
        />
        <Callout tone="info" title="Notice what he did">
          Euler never searched for routes. He didn't need to. He found a property that any solution
          would have to have, showed Königsberg lacked it, and was done. That is what a proof looks
          like.
        </Callout>
      </div>
    </>
  );
}
