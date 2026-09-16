/** Pure Monty Hall mechanics, shared by the playable game and the simulator. */

export type Strategy = "stay" | "switch";

export interface Round {
  car: number;
  firstPick: number;
  hostOpens: number;
  /** The door offered by the switch. */
  other: number;
}

export function randomDoor(n = 3): number {
  return Math.floor(Math.random() * n);
}

/** The host always opens a goat door that is not the contestant's pick. */
export function hostOpens(car: number, firstPick: number, n = 3): number {
  const options: number[] = [];
  for (let d = 0; d < n; d++) if (d !== car && d !== firstPick) options.push(d);
  return options[Math.floor(Math.random() * options.length)];
}

export function makeRound(firstPick: number, car = randomDoor()): Round {
  const opened = hostOpens(car, firstPick);
  const other = [0, 1, 2].find((d) => d !== firstPick && d !== opened)!;
  return { car, firstPick, hostOpens: opened, other };
}

export function outcome(round: Round, strategy: Strategy): boolean {
  const final = strategy === "stay" ? round.firstPick : round.other;
  return final === round.car;
}

/** Play `games` rounds with each strategy. Returns win counts. */
export function simulate(games: number): { stay: number; switch: number } {
  let stay = 0;
  let sw = 0;
  for (let i = 0; i < games; i++) {
    const car = randomDoor();
    const pick = randomDoor();
    // Stay wins iff first pick is the car; switch wins iff it isn't.
    if (pick === car) stay++;
    else sw++;
  }
  return { stay, switch: sw };
}

/** Variant where the host opens a random unpicked door (may reveal the car; those rounds are discarded). */
export function simulateRandomHost(games: number): { stay: number; switch: number; played: number } {
  let stay = 0;
  let sw = 0;
  let played = 0;
  for (let i = 0; i < games; i++) {
    const car = randomDoor();
    const pick = randomDoor();
    const options = [0, 1, 2].filter((d) => d !== pick);
    const opened = options[Math.floor(Math.random() * 2)];
    if (opened === car) continue; // host spoiled it; round doesn't count
    played++;
    const other = [0, 1, 2].find((d) => d !== pick && d !== opened)!;
    if (pick === car) stay++;
    if (other === car) sw++;
  }
  return { stay, switch: sw, played };
}
