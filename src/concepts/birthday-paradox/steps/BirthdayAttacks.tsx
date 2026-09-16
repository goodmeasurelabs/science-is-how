import Callout from "../../../components/Callout";

export default function BirthdayAttacks() {
  return (
    <div className="story-prose">
      <h2>Birthday Attacks</h2>
      <p>
        Swap "birthdays" for anything with a limited number of values and the same surprise
        appears. Nowhere does it matter more than in cryptography.
      </p>
      <p>
        A <strong>hash function</strong> turns any file or message into a fixed-length fingerprint.
        Security depends on nobody being able to find two different messages with the same
        fingerprint, a <strong>collision</strong>. If they could, a signed contract could be swapped
        for a forged one with an identical signature.
      </p>
      <p>
        You might think that with, say, a trillion possible fingerprints, an attacker would need
        around a trillion tries. But the attacker isn't matching <em>one</em> target. They're
        generating a crowd of messages and waiting for <em>any two</em> to collide. That's the
        birthday problem, and the crowd only needs to be about the <strong>square root</strong> of
        the number of fingerprints: roughly a million, not a trillion.
      </p>
      <Callout tone="info" title="Why hashes are so long">
        This is called a <strong>birthday attack</strong>, and it's the reason modern hash
        functions produce outputs of 256 bits or more. The square root of 2<sup>256</sup> is
        2<sup>128</sup>, which is still far beyond any computer's reach. Older 128-bit hashes like
        MD5 were already on thin ice by this rule; clever cryptanalysis then finished them off.
      </Callout>
      <p>
        The same square-root rule tells engineers how many random IDs they can hand out before two
        collide, why lottery-style "unique" codes need to be longer than they look, and how big a
        room a teacher needs for a party trick that works.
      </p>
      <p>
        Next time someone tells you a coincidence is "one in a million," ask how many pairs were
        in the room.
      </p>
    </div>
  );
}
