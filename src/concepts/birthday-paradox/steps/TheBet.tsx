import MiniSteps from "../../../components/MiniSteps";
import { trackInteraction } from "../../../lib/analytics";

function Quote({ who, children }: { who: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-surface-2 p-5 text-left shadow-card">
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted">{who}</p>
      <p className="font-display text-lg font-bold">{children}</p>
    </div>
  );
}

export default function TheBet() {
  return (
    <div className="story-prose">
      <h2>The Bet</h2>
      <p>
        Picture a classroom with 30 students. The teacher offers a bet: "I'll wager there are two
        people in this room with the same birthday." Nobody has compared notes. Nobody knows.
      </p>
      <p>
        Most students take the bet. 30 people, 365 possible birthdays, it feels like the room is
        nowhere near full enough. Then the teacher goes around the room, and somewhere around the
        twentieth student, two hands go up. Same day.
      </p>
      <p>
        This works about 70% of the time with 30 people. Teachers have been running the demo for
        decades because it never stops feeling like a trick.
      </p>
      <MiniSteps
        className="mt-6"
        nextLabel="Ok"
        onChange={(i) => trackInteraction({ story: "birthday-paradox", widget: "bet_scenes", action: "scene", value: i })}
        scenes={[
          <Quote who="The teacher">"I bet two people in here share a birthday."</Quote>,
          <Quote who="A student, confidently">"There are 365 days and 30 of us. No way."</Quote>,
          <Quote who="The teacher">"Let's go around the room. January birthdays first."</Quote>,
          <Quote who="Two students, at the same time">"October 12th!"</Quote>,
          <Quote who="The class">"...how?"</Quote>,
        ]}
      />
      <p className="mt-6">Let's see for ourselves. Next step: you get to fill the room.</p>
    </div>
  );
}
