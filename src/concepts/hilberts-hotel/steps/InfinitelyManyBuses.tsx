import MiniSteps from "../../../components/MiniSteps";
import { trackInteraction } from "../../../lib/analytics";

const powers = [
  { b: 1, p: 1, room: 6 },
  { b: 1, p: 2, room: 18 },
  { b: 2, p: 1, room: 12 },
  { b: 2, p: 2, room: 36 },
  { b: 3, p: 1, room: 24 },
];

export default function InfinitelyManyBuses() {
  return (
    <div className="story-prose">
      <h2>Infinitely Many Buses</h2>
      <p>
        The manager has just finished handing out keys when the parking lot fills up. Not one
        infinite bus: <strong>infinitely many infinite buses</strong>. Bus 1, bus 2, bus 3, and so
        on, each with infinitely many passengers.
      </p>
      <p>
        Doubling won't cut it now. The manager needs a way to give every passenger of every bus a
        room number, with no two people getting the same room. There are several tricks. Here's a
        famous one.
      </p>
      <MiniSteps
        nextLabel="Ok"
        onChange={(i) => trackInteraction({ story: "hilberts-hotel", widget: "many_buses", action: "scene", value: i })}
        scenes={[
          <p className="text-center text-muted">Step one: clear out the current guests.</p>,
          <div className="rounded-2xl bg-surface-2 p-5 shadow-card">
            <p className="font-display font-bold">Current guests: room n → room 2ⁿ</p>
            <p className="mt-2">
              Room 1 goes to room 2, room 2 to room 4, room 3 to room 8, room 4 to room 16. Every
              current guest is now in a room whose number is a power of 2.
            </p>
          </div>,
          <div className="rounded-2xl bg-surface-2 p-5 shadow-card">
            <p className="font-display font-bold">Bus b, passenger p → room 2ᵇ · 3ᵖ</p>
            <p className="mt-2">Bus 1's passengers get rooms built from a single factor of 2:</p>
            <table className="mx-auto mt-3 text-center font-mono text-sm">
              <tbody>
                {powers.map((x) => (
                  <tr key={`${x.b}-${x.p}`}>
                    <td className="px-2">bus {x.b}, seat {x.p}</td>
                    <td className="px-2 text-muted">→</td>
                    <td className="px-2">
                      2<sup>{x.b}</sup> · 3<sup>{x.p}</sup> = <strong>{x.room}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
          <div className="rounded-2xl bg-surface-2 p-5 shadow-card">
            <p className="font-display font-bold">Why nobody collides</p>
            <p className="mt-2">
              Every whole number factors into primes in exactly one way. So 2ᵇ · 3ᵖ tells you the
              bus and the seat, and no other bus-and-seat produces that number. The old guests, in
              pure powers of 2, don't overlap either. Rooms like 5, 7 and 10 stay empty. The
              hotel doesn't mind.
            </p>
          </div>,
        ]}
      />
      <p>
        Take a breath and notice what just happened. Infinity, times infinity, plus infinity, fit
        inside the same infinity. With room to spare. There has to be a rule underneath this, and
        there is.
      </p>
    </div>
  );
}
