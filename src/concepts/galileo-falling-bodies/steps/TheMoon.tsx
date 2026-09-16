import Callout from "../../../components/Callout";
import DropTest from "../DropTest";
import { Astronaut } from "../art/Objects";

export default function TheMoon() {
  return (
    <>
      <div className="story-prose">
        <h2>The Moon, 1971</h2>
        <p>
          Galileo argued his case in 1589. The clean version of his experiment, with no air at
          all, had to wait 382 years and a quarter-million-mile trip.
        </p>
        <p>
          On <strong>August 2, 1971</strong>, at the end of the last moonwalk of Apollo 15,
          commander <strong>David Scott</strong> stood in front of the TV camera holding a geology
          hammer (about 1.3 kg) in one hand and a falcon feather (about 30 g) in the other. The
          feather was a nod to the lunar module, named <em>Falcon</em>. He let go of both at the
          same moment.
        </p>
        <p>They hit the dust together.</p>
        <blockquote>"How about that! Mr. Galileo was correct in his findings."</blockquote>
        <div className="flex justify-center">
          <Astronaut />
        </div>
        <p>
          The Moon has no atmosphere, so there is no drag to fool anyone, and its gravity is only
          about a sixth of Earth's (1.62 m/s² versus 9.81), so the fall is slow enough to watch.
          Switch the drop test to Moon mode and see it for yourself.
        </p>
      </div>
      <div className="my-8">
        <DropTest defaultWorld="moon" widget="drop_test_moon" />
      </div>
      <div className="story-prose">
        <Callout tone="fun">
          The feather came from a falcon, the mascot of the U.S. Air Force Academy, which is why the
          lunar module was named <em>Falcon</em> in the first place. Scott left both the hammer and
          the feather on the Moon. They're still there.
        </Callout>
      </div>
    </>
  );
}
