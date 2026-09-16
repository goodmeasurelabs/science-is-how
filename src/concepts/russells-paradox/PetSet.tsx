import Cat1 from "../../assets/kitty-1.webp";
import Cat2 from "../../assets/kitty-2.webp";
import Cat3 from "../../assets/kitty-3.webp";
import Dog1 from "../../assets/dog-1.webp";
import Dog2 from "../../assets/dog-2.webp";
import Dog3 from "../../assets/dog-3.webp";

type Kind = "Cat" | "Dog" | "Both";

const cats = [Cat1, Cat2, Cat3];
const dogs = [Dog1, Dog2, Dog3];

function PetImg({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="h-16 w-auto md:h-28" />;
}

/** A set drawn as curly braces around some pets. */
export default function PetSet({ set }: { set: Kind }) {
  const members =
    set === "Cat" ? cats.map((s, i) => ({ src: s, alt: `Cat ${i + 1}` }))
    : set === "Dog" ? dogs.map((s, i) => ({ src: s, alt: `Dog ${i + 1}` }))
    : [
        ...cats.map((s, i) => ({ src: s, alt: `Cat ${i + 1}` })),
        ...dogs.map((s, i) => ({ src: s, alt: `Dog ${i + 1}` })),
      ];
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="font-mono text-5xl text-accent md:text-7xl" aria-hidden>
        {"{"}
      </span>
      <div className="flex flex-wrap items-end justify-center gap-2">
        {members.map((m) => (
          <PetImg key={m.alt} src={m.src} alt={m.alt} />
        ))}
      </div>
      <span className="font-mono text-5xl text-accent md:text-7xl" aria-hidden>
        {"}"}
      </span>
    </div>
  );
}
