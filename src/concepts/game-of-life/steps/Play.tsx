import LifeBoard from "../LifeBoard";

export default function Play() {
  return (
    <div className="w-full">
      <div className="story-prose">
        <h2>Play</h2>
        <p>
          Your turn. Draw some cells on the board (click or drag), then press <strong>Play</strong>{" "}
          and watch the three rules go to work. Try a random soup first, then clear the board and
          draw your own shapes. Almost everything settles down eventually. The question is how long
          it takes, and what's left when it does.
        </p>
      </div>
      <div className="mt-6">
        <LifeBoard initial="random" presets={false} />
      </div>
      <div className="story-prose mt-8">
        <p className="text-sm text-muted">
          Things to try: a single row of three cells. A 2×2 square. A row of ten. A diagonal line.
          Use <strong>Step</strong> to advance one generation at a time and check the rules by hand.
        </p>
      </div>
    </div>
  );
}
