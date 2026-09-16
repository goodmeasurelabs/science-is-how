export default function NonSelfContainingSets() {
  return (
    <div className="story-prose">
      <h2>Non-Self-Containing Sets</h2>
      <p>
        Most sets are the boring kind. <code>{"{1, 2, 3}"}</code> does not contain itself: its
        elements are three numbers, and none of them is the set <code>{"{1, 2, 3}"}</code>. The set
        of all cats is not a cat. The set of all teacups is not a teacup.
      </p>
      <p>
        We'll call these <strong>non-self-containing</strong> sets. Every ordinary set you've ever
        met is one of them.
      </p>
      <p>
        Now for Russell's move. If "contains itself" is a legal property, then so is "does not
        contain itself." And any property defines a set. So let's build one:
      </p>
      <p className="text-center font-display text-xl font-bold">
        R = the set of all sets that do not contain themselves.
      </p>
      <p>It's a perfectly sensible-looking set. Cats are in it. Teacups are in it. Numbers are in it.</p>
      <p>
        There's just one question we should ask before moving on.
      </p>
    </div>
  );
}
