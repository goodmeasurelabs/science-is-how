import Callout from "../../../components/Callout";

export default function TheLetter() {
  return (
    <div className="story-prose">
      <h2>The Letter</h2>
      <p>
        <strong>Monty Hall</strong> hosted the TV game show <em>Let's Make a Deal</em> starting in
        1963. Contestants in costumes traded prizes for mystery boxes and curtains, and Monty was
        famous for tempting them to swap a sure thing for an unknown.
      </p>
      <p>
        The puzzle named after him was first written down by a statistician, Steve Selvin, in a
        1975 letter to the journal <em>The American Statistician</em>. It sat quietly in academic
        circles for fifteen years.
      </p>
      <p>
        Then, on September 9, 1990, a reader named Craig Whitaker sent it to Marilyn vos Savant,
        who answered readers' questions in her "Ask Marilyn" column in <em>Parade</em>, a Sunday
        newspaper magazine read by millions. Her byline noted she held the Guinness record for the
        highest recorded IQ.
      </p>
      <Callout tone="history" title="The question, as printed">
        Suppose you're on a game show, and you're given the choice of three doors: behind one door
        is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows
        what's behind the doors, opens another door, say No. 3, which has a goat. He then says to
        you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice?
      </Callout>
      <p>
        Marilyn's answer: <strong>Yes, you should switch.</strong> The first door has a 1 in 3
        chance of hiding the car. The other door has a 2 in 3 chance.
      </p>
      <p>Before we argue about it, let's play.</p>
    </div>
  );
}
