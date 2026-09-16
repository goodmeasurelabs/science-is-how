import { useState } from "react";
import Button from "../../../components/Button";
import Guest from "./Guest";
import { trackInteraction } from "../../../lib/analytics";
import "./HotelWidget.css";

const VISIBLE_ROOMS = 10;
const COLS = VISIBLE_ROOMS + 1; // last column is the "…" door
const BUS_COLORS = ["#ff7a59", "#60c2e8", "#34d399", "#fbbf24", "#a78bfa", "#f472b6"];

interface GuestT {
  id: number;
  bus: number; // 0 = original residents
  room: number;
  fresh: boolean;
}

let nextId = 1;
function initialGuests(): GuestT[] {
  nextId = 1;
  return Array.from({ length: VISIBLE_ROOMS }, (_, i) => ({ id: nextId++, bus: 0, room: i + 1, fresh: false }));
}

interface Props {
  /** Which actions to offer. */
  actions?: Array<"guest" | "bus">;
}

export default function HotelWidget({ actions = ["guest", "bus"] }: Props) {
  const [guests, setGuests] = useState<GuestT[]>(initialGuests);
  const [busCount, setBusCount] = useState(0);
  const [caption, setCaption] = useState<string>("Every room is full. Guests in rooms 1 to ∞.");

  const settle = (list: GuestT[]) => list.filter((g) => g.room <= VISIBLE_ROOMS * 4).map((g) => ({ ...g, fresh: false }));

  const newGuest = () => {
    const bus = busCount + 1;
    setBusCount(bus);
    setGuests((prev) => [
      ...settle(prev).map((g) => ({ ...g, room: g.room + 1 })),
      { id: nextId++, bus, room: 1, fresh: true },
    ]);
    setCaption("Everyone moves: room n → room n + 1. Room 1 is free.");
    trackInteraction({ story: "hilberts-hotel", widget: "hotel", action: "new_guest" });
  };

  const newBus = () => {
    const bus = busCount + 1;
    setBusCount(bus);
    setGuests((prev) => {
      const moved = settle(prev).map((g) => ({ ...g, room: g.room * 2 }));
      const arrivals: GuestT[] = [];
      for (let r = 1; r <= VISIBLE_ROOMS; r += 2) arrivals.push({ id: nextId++, bus, room: r, fresh: true });
      return [...moved, ...arrivals];
    });
    setCaption("Everyone moves: room n → room 2n. Every odd room is free. Infinitely many of them.");
    trackInteraction({ story: "hilberts-hotel", widget: "hotel", action: "infinite_bus" });
  };

  const reset = () => {
    setGuests(initialGuests());
    setBusCount(0);
    setCaption("Every room is full. Guests in rooms 1 to ∞.");
    trackInteraction({ story: "hilberts-hotel", widget: "hotel", action: "reset" });
  };

  const colW = 100 / COLS;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-3xl border border-line bg-surface-2 p-3 shadow-card md:p-5">
        {/* sign */}
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-display text-sm font-extrabold uppercase tracking-widest text-accent">Hotel ∞</span>
          <span className="rounded-full bg-ink px-3 py-0.5 font-display text-xs font-extrabold text-surface">NO VACANCY</span>
        </div>
        {/* rooms */}
        <div className="relative h-24 overflow-hidden rounded-2xl border-2 border-ink/80 bg-accent-2/15 md:h-28">
          <div className="absolute inset-0 flex">
            {Array.from({ length: COLS }, (_, i) => (
              <div key={i} className="flex flex-1 flex-col items-center border-r border-ink/20 last:border-r-0">
                <span className="mt-1 font-display text-[10px] font-extrabold text-ink md:text-xs">{i < VISIBLE_ROOMS ? i + 1 : "…"}</span>
              </div>
            ))}
          </div>
          {guests.map((g) => {
            const col = g.room <= VISIBLE_ROOMS ? g.room - 1 : VISIBLE_ROOMS;
            const gone = g.room > VISIBLE_ROOMS;
            return (
              <div
                key={g.id}
                className={`hotel-guest flex justify-center ${g.fresh ? "enter" : ""}`}
                style={{ left: `${col * colW}%`, width: `${colW}%`, opacity: gone ? 0 : 1 }}
                title={`Guest from ${g.bus === 0 ? "the start" : `bus ${g.bus}`}, room ${g.room}`}
              >
                <Guest color={BUS_COLORS[g.bus % BUS_COLORS.length]} size={22} />
              </div>
            );
          })}
        </div>
        <p className="mt-3 min-h-[2.5rem] text-center text-sm text-muted">{caption}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {actions.includes("guest") && (
            <Button size="sm" variant="primary" onClick={newGuest}>
              One new guest arrives
            </Button>
          )}
          {actions.includes("bus") && (
            <Button size="sm" variant="primary" onClick={newBus}>
              An infinite bus arrives
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
