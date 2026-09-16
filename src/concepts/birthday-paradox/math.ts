export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Exact probability that at least two of n people share a birthday (365 days, uniform). */
export function pMatch(n: number): number {
  if (n < 2) return 0;
  if (n > 365) return 1;
  let pNone = 1;
  for (let i = 0; i < n; i++) pNone *= (365 - i) / 365;
  return 1 - pNone;
}

/** Day of year 0..364 -> "Mar 14". */
export function dayLabel(day: number): string {
  let d = day;
  for (let m = 0; m < 12; m++) {
    if (d < MONTH_DAYS[m]) return `${MONTHS[m]} ${d + 1}`;
    d -= MONTH_DAYS[m];
  }
  return "Dec 31";
}

/** Full month name for prose ("March 14"). */
export function dayLabelLong(day: number): string {
  const long = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let d = day;
  for (let m = 0; m < 12; m++) {
    if (d < MONTH_DAYS[m]) return `${long[m]} ${d + 1}`;
    d -= MONTH_DAYS[m];
  }
  return "December 31";
}

export function randomBirthdays(n: number): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 365));
}

/** Map of birthday -> indexes of people sharing it (only groups of 2+). */
export function findMatches(birthdays: number[]): Map<number, number[]> {
  const groups = new Map<number, number[]>();
  birthdays.forEach((b, i) => {
    const g = groups.get(b);
    if (g) g.push(i);
    else groups.set(b, [i]);
  });
  for (const [k, v] of groups) if (v.length < 2) groups.delete(k);
  return groups;
}

export function pct(p: number, digits = 1): string {
  return `${(p * 100).toFixed(digits)}%`;
}
