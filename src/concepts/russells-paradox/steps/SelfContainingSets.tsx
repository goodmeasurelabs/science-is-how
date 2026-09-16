import Callout from "../../../components/Callout";

export default function SelfContainingSets() {
  return (
    <div className="story-prose">
      <h2>Self-Containing Sets</h2>
      <p>
        Here's where it gets strange. A set's elements can be other sets. The set{" "}
        <code>{"{ {1}, {2, 3} }"}</code> has two elements, and both of them are sets.
      </p>
      <p>
        So could a set contain <em>itself</em>? Imagine a set <code>S</code> defined as{" "}
        <code>{"{a, b, c, S}"}</code>. One of its elements is... <code>S</code>. We'd call{" "}
        <code>S</code> <strong>self-containing</strong>.
      </p>
      <p>
        A friendlier example: "the set of all things that are not teacups." That set is itself not a
        teacup, so it belongs to itself. Or "the set of all sets with more than one element." That
        set has loads of elements, so it qualifies for membership in itself.
      </p>
      <Callout tone="info">
        In the naive set theory of 1900, any property you could describe defined a set. "Contains
        itself" was a perfectly legal property. Keep that in mind.
      </Callout>
    </div>
  );
}
