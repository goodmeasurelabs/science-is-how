import HotelWidget from "../art/HotelWidget";
import Callout from "../../../components/Callout";

export default function InfiniteBus() {
  return (
    <>
      <div className="story-prose">
        <h2>The Infinite Bus</h2>
        <p>
          A bus pulls up. It is an infinitely long bus, and every seat is taken: passenger 1,
          passenger 2, passenger 3, forever. They would all like rooms.
        </p>
        <p>
          Moving everyone up one room won't do it. Moving everyone up a million rooms won't do it
          either. The manager needs to free up <em>infinitely many</em> rooms at once.
        </p>
        <p>
          The announcement: <strong>"Everyone, please move to the room with double your number."</strong>{" "}
          Room 1 goes to room 2, room 2 to room 4, room 3 to room 6. Room <code>n</code> goes to
          room <code>2n</code>. Every current guest lands in an even-numbered room.
        </p>
        <p>
          Now every <strong>odd</strong> room is empty. There are infinitely many of those. Passenger{" "}
          <code>p</code> from the bus takes room <code>2p − 1</code>: passenger 1 to room 1,
          passenger 2 to room 3, passenger 3 to room 5. Everybody sleeps indoors tonight.
        </p>
      </div>
      <div className="mt-6">
        <HotelWidget actions={["guest", "bus"]} />
      </div>
      <div className="story-prose mt-8">
        <Callout tone="fun">
          The widget can only draw the first ten rooms, so guests keep "disappearing" off the right
          edge. They're fine. They're in room 20, or 40, or 80, enjoying the minibar.
        </Callout>
      </div>
    </>
  );
}
