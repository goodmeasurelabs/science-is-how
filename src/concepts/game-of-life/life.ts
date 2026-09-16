/** Pure Game of Life logic. The grid is a flat Uint8Array, row-major, edges wrap (torus). */

export type Grid = Uint8Array;

export function makeGrid(cols: number, rows: number): Grid {
  return new Uint8Array(cols * rows);
}

export function stepGrid(grid: Grid, cols: number, rows: number): Grid {
  const next = new Uint8Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    const up = ((y - 1 + rows) % rows) * cols;
    const mid = y * cols;
    const down = ((y + 1) % rows) * cols;
    for (let x = 0; x < cols; x++) {
      const l = (x - 1 + cols) % cols;
      const r = (x + 1) % cols;
      const n =
        grid[up + l] + grid[up + x] + grid[up + r] +
        grid[mid + l] + grid[mid + r] +
        grid[down + l] + grid[down + x] + grid[down + r];
      const alive = grid[mid + x] === 1;
      next[mid + x] = alive ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
    }
  }
  return next;
}

export function population(grid: Grid): number {
  let p = 0;
  for (let i = 0; i < grid.length; i++) p += grid[i];
  return p;
}

/** Patterns as [x, y] offsets from their top-left corner. */
export const PATTERNS: Record<string, { label: string; cells: [number, number][] }> = {
  block: { label: "Block", cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  blinker: { label: "Blinker", cells: [[0, 0], [1, 0], [2, 0]] },
  glider: { label: "Glider", cells: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]] },
  rpentomino: { label: "R-pentomino", cells: [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]] },
  gun: {
    label: "Gosper glider gun",
    cells: [
      [24, 0],
      [22, 1], [24, 1],
      [12, 2], [13, 2], [20, 2], [21, 2], [34, 2], [35, 2],
      [11, 3], [15, 3], [20, 3], [21, 3], [34, 3], [35, 3],
      [0, 4], [1, 4], [10, 4], [16, 4], [20, 4], [21, 4],
      [0, 5], [1, 5], [10, 5], [14, 5], [16, 5], [17, 5], [22, 5], [24, 5],
      [10, 6], [16, 6], [24, 6],
      [11, 7], [15, 7],
      [12, 8], [13, 8],
    ],
  },
};

export function placePattern(
  cols: number,
  rows: number,
  cells: [number, number][],
  offset?: { x: number; y: number },
): Grid {
  const g = makeGrid(cols, rows);
  const w = Math.max(...cells.map((c) => c[0])) + 1;
  const h = Math.max(...cells.map((c) => c[1])) + 1;
  const ox = offset?.x ?? Math.floor((cols - w) / 2);
  const oy = offset?.y ?? Math.floor((rows - h) / 2);
  for (const [x, y] of cells) {
    const gx = ox + x;
    const gy = oy + y;
    if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) g[gy * cols + gx] = 1;
  }
  return g;
}

export function randomGrid(cols: number, rows: number, density = 0.3): Grid {
  const g = makeGrid(cols, rows);
  for (let i = 0; i < g.length; i++) g[i] = Math.random() < density ? 1 : 0;
  return g;
}
