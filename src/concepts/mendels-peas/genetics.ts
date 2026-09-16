/** Seed-shape genetics for the widgets. R = round (dominant), r = wrinkled. */
export type Allele = "R" | "r";
export type Genotype = "RR" | "Rr" | "rr";

export const GENOTYPES: Genotype[] = ["RR", "Rr", "rr"];

export const genotypeLabel: Record<Genotype, string> = {
  RR: "true-breeding round",
  Rr: "hybrid (looks round)",
  rr: "true-breeding wrinkled",
};

export function alleles(g: Genotype): [Allele, Allele] {
  return [g[0] as Allele, g[1] as Allele];
}

/** Normalise "rR" to "Rr" so genotypes compare cleanly. */
export function combine(a: Allele, b: Allele): Genotype {
  if (a === "R" && b === "R") return "RR";
  if (a === "r" && b === "r") return "rr";
  return "Rr";
}

export function isWrinkled(g: Genotype): boolean {
  return g === "rr";
}

/** The four cells of a Punnett square, in reading order. */
export function punnett(mom: Genotype, dad: Genotype): { cell: Genotype; from: [Allele, Allele] }[] {
  const [m1, m2] = alleles(mom);
  const [d1, d2] = alleles(dad);
  return [
    { cell: combine(m1, d1), from: [m1, d1] },
    { cell: combine(m1, d2), from: [m1, d2] },
    { cell: combine(m2, d1), from: [m2, d1] },
    { cell: combine(m2, d2), from: [m2, d2] },
  ];
}

/** Expected round:wrinkled ratio as a human string. */
export function expectedRatio(mom: Genotype, dad: Genotype): { round: number; wrinkled: number; text: string } {
  const cells = punnett(mom, dad);
  const wrinkled = cells.filter((c) => isWrinkled(c.cell)).length;
  const round = 4 - wrinkled;
  let text: string;
  if (wrinkled === 0) text = "All round";
  else if (round === 0) text = "All wrinkled";
  else if (round === wrinkled) text = "1 round : 1 wrinkled";
  else text = `${round} round : ${wrinkled} wrinkled`;
  return { round, wrinkled, text };
}

/** Random offspring: each parent contributes one allele at random. */
export function breed(mom: Genotype, dad: Genotype, n: number): Genotype[] {
  const m = alleles(mom);
  const d = alleles(dad);
  const out: Genotype[] = new Array(n);
  for (let i = 0; i < n; i++) {
    out[i] = combine(m[Math.random() < 0.5 ? 0 : 1], d[Math.random() < 0.5 ? 0 : 1]);
  }
  return out;
}
