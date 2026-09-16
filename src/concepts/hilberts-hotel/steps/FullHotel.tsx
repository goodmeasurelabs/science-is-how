import HotelWidget from "../art/HotelWidget";

export default function FullHotel() {
  return (
    <>
      <div className="story-prose">
        <h2>A Full Hotel</h2>
        <p>
          Every room is occupied. Room 1, room 2, room 3, all the way up. There is no "last room"
          that happens to be empty, because there is no last room.
        </p>
        <p>
          A new guest arrives. The manager announces: <strong>"Everyone, please move to the room
          with the next number up."</strong> The guest in room 1 goes to room 2, room 2 goes to
          room 3, and in general room <code>n</code> goes to room <code>n + 1</code>.
        </p>
        <p>
          Nobody ends up without a room, since every guest has a next room to go to. And room 1 is
          now empty. The new guest checks in.
        </p>
        <p className="text-center text-sm text-muted">Try it. Try it a few times.</p>
      </div>
      <div className="mt-6">
        <HotelWidget actions={["guest"]} />
      </div>
      <div className="story-prose mt-8">
        <p>
          This already breaks a rule you've believed since kindergarten: if you add one to a
          collection, it gets bigger. Here we added a guest and the hotel is exactly as full as it
          was. Same rooms, same guests-per-room, one more guest.
        </p>
      </div>
    </>
  );
}
