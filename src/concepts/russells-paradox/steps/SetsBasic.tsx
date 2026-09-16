import MiniSteps from "../../../components/MiniSteps";
import PetSet from "../PetSet";
import { trackInteraction } from "../../../lib/analytics";

export default function SetsBasic() {
  return (
    <div className="story-prose">
      <h2>Sets</h2>
      <p>
        A <strong>set</strong> is a collection of distinct objects, treated as a single thing in its
        own right. Sets are one of the most fundamental ideas in mathematics. Numbers, functions,
        even geometry can all be built out of them.
      </p>
      <p>
        The objects in a set are called its <strong>elements</strong> or <strong>members</strong>.
        We write <code>{"{1, 2, 3}"}</code> for the set whose elements are 1, 2 and 3.
      </p>
      <p>Sets don't have to hold numbers. Anything can be an element. Let's use pets.</p>
      <MiniSteps
        className="mt-6"
        onChange={(i) => trackInteraction({ story: "russells-paradox", widget: "pet_sets", action: "scene", value: i })}
        scenes={[
          <p className="text-center text-muted">Click Ok to build a set.</p>,
          <div>
            <p className="mb-3 text-center">Here is a set of cats:</p>
            <PetSet set="Cat" />
          </div>,
          <div>
            <p className="mb-3 text-center">Here is a set of dogs:</p>
            <PetSet set="Dog" />
          </div>,
          <div>
            <p className="mb-3 text-center">And here is a set of cats and dogs. Also a set!</p>
            <PetSet set="Both" />
          </div>,
        ]}
      />
    </div>
  );
}
