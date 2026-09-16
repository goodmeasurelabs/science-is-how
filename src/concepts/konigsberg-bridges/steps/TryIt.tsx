import BridgeMap from "../BridgeMap";

export default function TryIt() {
  return (
    <>
      <div className="story-prose">
        <h2>Try It Yourself</h2>
        <p>
          Click a bank or an island to choose where you start. Then click a bridge attached to where
          you're standing to cross it. Crossed bridges turn orange and get numbered. Cross all seven
          without repeating one and you've beaten the whole city of Königsberg.
        </p>
      </div>
      <div className="mt-6">
        <BridgeMap widget="bridge_walk" />
      </div>
      <div className="story-prose mt-8">
        <p>
          Give it a few honest attempts. Every time you get stuck, notice <em>where</em> you get
          stuck. There's a pattern, and a Swiss mathematician in Russia was about to spot it.
        </p>
      </div>
    </>
  );
}
