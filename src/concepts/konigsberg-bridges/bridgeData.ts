/** Land masses and bridges of Königsberg, shared by the map widget and its views. */

export type LandId = "north" | "south" | "kneiphof" | "lomse";

export interface Land {
  id: LandId;
  name: string;
  fill: string;
  /** Centre used for the walker and for the graph view. */
  cx: number;
  cy: number;
}

export interface Bridge {
  id: number;
  name: string;
  from: LandId;
  to: LandId;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const LANDS: Land[] = [
  { id: "north", name: "North bank", fill: "#d5e8c4", cx: 300, cy: 58 },
  { id: "kneiphof", name: "Kneiphof", fill: "#f9d3c2", cx: 200, cy: 200 },
  { id: "lomse", name: "Lomse", fill: "#ddd4f3", cx: 440, cy: 200 },
  { id: "south", name: "South bank", fill: "#f4e3b5", cx: 300, cy: 342 },
];

export const landById = Object.fromEntries(LANDS.map((l) => [l.id, l])) as Record<LandId, Land>;

/** The seven bridges of 1736. */
export const BRIDGES: Bridge[] = [
  { id: 1, name: "Krämer Bridge", from: "north", to: "kneiphof", x1: 165, y1: 100, x2: 165, y2: 166 },
  { id: 2, name: "Schmiede Bridge", from: "north", to: "kneiphof", x1: 235, y1: 100, x2: 235, y2: 166 },
  { id: 3, name: "Grüne Bridge", from: "kneiphof", to: "south", x1: 165, y1: 234, x2: 165, y2: 300 },
  { id: 4, name: "Köttel Bridge", from: "kneiphof", to: "south", x1: 235, y1: 234, x2: 235, y2: 300 },
  { id: 5, name: "Honig Bridge", from: "kneiphof", to: "lomse", x1: 258, y1: 200, x2: 352, y2: 200 },
  { id: 6, name: "Holz Bridge", from: "north", to: "lomse", x1: 440, y1: 100, x2: 440, y2: 160 },
  { id: 7, name: "Hohe Bridge", from: "lomse", to: "south", x1: 440, y1: 240, x2: 440, y2: 300 },
];

/** The eighth bridge, built in 1905, between Lomse and the south bank. */
export const KAISER_BRIDGE: Bridge = {
  id: 8,
  name: "Kaiser Bridge (1905)",
  from: "lomse",
  to: "south",
  x1: 505,
  y1: 232,
  x2: 505,
  y2: 300,
};

export function degreeOf(land: LandId, bridges: Bridge[]): number {
  return bridges.filter((b) => b.from === land || b.to === land).length;
}
