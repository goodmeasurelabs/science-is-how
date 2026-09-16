import Callout from "../../../components/Callout";

function Monk() {
  const ink = "rgb(var(--ink))";
  return (
    <svg viewBox="0 0 200 200" width="180" height="180" className="illo" role="img" aria-label="Cartoon friar holding a pea plant">
      <circle cx="100" cy="100" r="88" fill="#e8f5e2" />
      <path d="M60 190c0-40 10-70 40-70s40 30 40 70z" fill="#4a3b2a" stroke={ink} strokeWidth="5" strokeLinejoin="round" />
      <path d="M100 120v70" stroke="#2b2033" strokeWidth="4" opacity=".3" />
      <circle cx="100" cy="80" r="34" fill="#f5d9c4" stroke={ink} strokeWidth="5" />
      <path d="M66 74c4-20 20-30 34-30s30 10 34 30c-8-6-18-8-34-8s-26 2-34 8z" fill="#8b7355" stroke={ink} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="100" cy="50" r="12" fill="#f5d9c4" stroke={ink} strokeWidth="4" />
      <g fill={ink}><circle cx="88" cy="82" r="3" /><circle cx="112" cy="82" r="3" /></g>
      <path d="M92 96q8 6 16 0" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <rect x="80" y="74" width="16" height="14" rx="4" fill="none" stroke={ink} strokeWidth="3" />
      <rect x="104" y="74" width="16" height="14" rx="4" fill="none" stroke={ink} strokeWidth="3" />
      <path d="M96 80h8" stroke={ink} strokeWidth="3" />
      <path d="M150 190c-2-30-2-60 10-90" fill="none" stroke="#5a9c4b" strokeWidth="5" strokeLinecap="round" />
      <path d="M155 140l-12-8M157 120l12-6M158 160l12-8" fill="none" stroke="#5a9c4b" strokeWidth="5" strokeLinecap="round" />
      <path d="M140 150c3-6 8-6 12-2s-1 10-8 10-6-4-4-8z" fill="#7cc36c" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M165 108c6-3 10 1 9 6s-8 6-11 2-1-7 2-8z" fill="#7cc36c" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <path d="M135 150c-3 5-1 10 4 12" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function TheMonk() {
  return (
    <div className="story-prose">
      <h2>The Monk in the Garden</h2>
      <p>
        Gregor Mendel was born in 1822 to a farming family in what is now the Czech Republic. He
        was clever, poor and often ill, and the only route to an education he could afford was
        the church. In 1843 he joined the Augustinian friars at St Thomas's Abbey in Brünn (today's
        Brno).
      </p>
      <p>
        The abbey sent him to the University of Vienna, where he studied physics and mathematics,
        not biology. That turns out to matter. He came back thinking like a physicist: run a
        controlled experiment, count everything, look for the law.
      </p>
      <Callout tone="fun" title="The exam he failed. Twice.">
        Mendel sat the exam to become a certified high-school teacher in 1850 and again in 1856,
        and failed both times, reportedly wobbling on the natural-history questions. He spent the
        rest of his career as an uncertified substitute. Then he went and founded genetics.
      </Callout>
      <p>
        In 1856 he started planting peas in a strip of the monastery garden about 35 by 7 metres.
        Peas were a smart choice. They grow fast, they normally fertilise themselves (so a plant's
        offspring are predictable), and Mendel could cross two plants by hand with a paintbrush
        when he wanted to.
      </p>
      <p>
        Over the next seven years he raised and examined around <strong>28,000 plants</strong>. He
        didn't describe them. He counted them.
      </p>
      <figure>
        <Monk />
        <figcaption>Gregor Mendel, 1822–1884. Friar, substitute teacher, counter of peas.</figcaption>
      </figure>
    </div>
  );
}
