import Callout from "../../../components/Callout";
import LifeBoard from "../LifeBoard";

export default function TheBet() {
  return (
    <div className="w-full">
      <div className="story-prose">
        <h2>The $50 Bet</h2>
        <p>
          In the 1970 column, Conway made a conjecture and put money on it. He believed no pattern
          could grow forever: every starting position, however wild, would eventually either die,
          settle into still lifes and oscillators, or drift off as a fixed handful of spaceships.
          The population could never climb without limit. He offered <strong>$50</strong> to anyone
          who could prove him wrong before the end of the year.
        </p>
        <p>
          It took about a month. A group at MIT's Artificial Intelligence Lab led by Bill Gosper,
          who had a computer and a lot of late nights, found a configuration that fires a fresh
          glider every 30 generations. A <strong>glider gun</strong>. Each glider is five cells
          that never die, so the population rises forever. Gosper collected the $50.
        </p>
      </div>
      <div className="mt-6">
        <LifeBoard initial="gun" presets={false} />
      </div>
      <div className="story-prose mt-8">
        <p>
          Press Play and watch the population counter. On this wrapping board the gliders will
          eventually come round and crash into the gun, so real gunsmiths use an infinite plane. But
          for a while you'll see exactly what Gosper saw: a machine, made of nothing but the three
          rules, manufacturing things.
        </p>
        <Callout tone="history" title="Why it mattered">
          A gun means Life can create structure indefinitely. That was the first sign that the game
          might be able to compute, not just decorate.
        </Callout>
      </div>
    </div>
  );
}
