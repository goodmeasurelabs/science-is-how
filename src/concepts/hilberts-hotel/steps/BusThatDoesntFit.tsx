import DiagonalWidget from "../art/DiagonalWidget";

export default function BusThatDoesntFit() {
  return (
    <>
      <div className="story-prose">
        <h2>The Bus That Doesn't Fit</h2>
        <p>
          One last bus. Its passengers are the <strong>real numbers between 0 and 1</strong>: every
          infinite decimal, like 0.5000…, 0.3333…, 0.1415926…, and all the ones no one has ever
          written down.
        </p>
        <p>
          Suppose the manager claims to have done it: every passenger has a room, every room has a
          passenger. Then there's a list. Room 1's passenger is some decimal, room 2's is another,
          and so on down the manifest.
        </p>
        <p>
          Cantor's move is to build a passenger who is <em>not on the list</em>. Walk down the
          diagonal: take the 1st digit of the 1st number, the 2nd digit of the 2nd, the 3rd of the
          3rd. At each spot, write down a <strong>different</strong> digit.
        </p>
      </div>
      <div className="mt-6">
        <DiagonalWidget />
      </div>
      <div className="story-prose mt-8">
        <p>
          The new number differs from room 1's passenger in the 1st digit, from room 2's in the 2nd
          digit, from room n's in the nth digit. It can't be anyone on the list. But it's a real
          number between 0 and 1, so it should have been on the bus.
        </p>
        <p>
          It doesn't matter how the manager built the list. Any list at all has a diagonal, and the
          diagonal gives you someone who was left off. <strong>The reals can't be paired with the
          rooms.</strong> This bus does not fit.
        </p>
      </div>
    </>
  );
}
