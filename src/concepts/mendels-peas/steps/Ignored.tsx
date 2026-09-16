import Callout from "../../../components/Callout";
import Pea from "../art/Pea";

const timeline = [
  { year: "1865", text: "Mendel reads his paper to the Natural History Society of Brünn over two evenings in February and March." },
  { year: "1866", text: "\"Experiments on Plant Hybrids\" is printed in the society's proceedings and mailed to about 120 libraries and scientists. Almost nobody reacts." },
  { year: "1868", text: "Mendel is elected abbot. Administration, and a long fight with the government over a monastery tax, eat his time. The pea work stops." },
  { year: "1884", text: "Mendel dies in Brno. His successor burns most of his papers." },
  { year: "1900", text: "Hugo de Vries (Netherlands), Carl Correns (Germany) and Erich von Tschermak (Austria) each independently find 3 : 1 ratios in their own plants, then find Mendel's paper describing the whole thing." },
  { year: "1905–09", text: "William Bateson names the field \"genetics\". Wilhelm Johannsen coins the word \"gene\" for Mendel's factor." },
  { year: "1953", text: "Watson, Crick, Franklin and Wilkins work out the double-helix structure of DNA, the molecule the factors are written in." },
  { year: "1990", text: "Researchers identify the wrinkled-pea gene: a broken enzyme that normally branches starch. Without it the seed stores less starch, holds more water while growing, and shrivels as it dries." },
];

export default function Ignored() {
  return (
    <div className="story-prose">
      <h2>Ignored for 34 Years</h2>
      <p>
        Mendel presented his results in 1865 and published them in 1866. The paper is careful,
        quantitative and, by the standards of the day, deeply strange. Biologists described things;
        Mendel counted them and did algebra. He sent copies to leading botanists. One of them,
        Carl Nägeli, wrote back politely and suggested he try hawkweed, a plant that (unluckily)
        reproduces without normal fertilisation and gave Mendel nothing but confusing results.
      </p>
      <p>
        Then the abbey made him abbot, and that was the end of the experiments.
      </p>

      <ol className="!list-none my-8 space-y-3 border-l-2 border-accent/40 !pl-5">
        {timeline.map((t) => (
          <li key={t.year} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full bg-accent" aria-hidden />
            <span className="font-display font-extrabold text-accent">{t.year}</span>{" "}
            <span>{t.text}</span>
          </li>
        ))}
      </ol>

      <Callout tone="history" title="The rediscovery">
        In the spring of 1900 three botanists in three countries, working separately, hit the same
        3 : 1 ratio and went looking for earlier work. All three found the 34-year-old paper from
        Brünn. Correns, to his credit, insisted the credit belonged to Mendel. Within a decade the
        "factors" had a name, gene, and biology had a new branch.
      </Callout>

      <p>
        Everything since, from blood types to genetic testing to why you have your grandmother's
        eyes, runs on the rule Mendel pulled out of a pile of peas: two copies of each factor, one
        from each parent, passed on at random, some dominant and some hiding.
      </p>
      <div className="mt-6 flex justify-center gap-1" aria-hidden>
        <Pea size={36} />
        <Pea size={36} />
        <Pea size={36} />
        <Pea wrinkled size={36} />
      </div>
      <p className="text-center text-sm text-muted">Three round, one wrinkled. Now you know why.</p>
    </div>
  );
}
