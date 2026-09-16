import Callout from "../../../components/Callout";

export default function TheBacklash() {
  return (
    <div className="story-prose">
      <h2>The Backlash</h2>
      <p>
        The column ran, and the mail arrived. <em>Parade</em> received about{" "}
        <strong>10,000 letters</strong>. Roughly a thousand came from people with PhDs, many
        writing on university letterhead, and the great majority told Marilyn she had blown it.
        The odds, they insisted, were plainly 50/50.
      </p>
      <p>
        A lot of the letters were not polite. Several suggested she stick to subjects she
        understood. Some made a point of her being a woman. One professor wrote that there was
        "enough mathematical illiteracy in this country" without the world's highest IQ adding to
        it.
      </p>
      <p>
        Marilyn held her ground. She wrote follow-up columns, laid out the cases, and asked
        schoolteachers across the country to run the experiment with their classes. They did, with
        cups and pennies and paper doors. The results came back: switching won about two-thirds
        of the time. Slowly, the letters changed tone.
      </p>
      <Callout tone="history" title="Even Erdős">
        <strong>Paul Erdős</strong>, one of the most prolific mathematicians who ever lived, was
        shown the problem by his friend Andrew Vázsonyi. Erdős didn't buy the answer. Vázsonyi
        walked him through the cases; still no. According to Vázsonyi, Erdős only accepted it
        after watching a computer simulation play the game hundreds of times, and even then he
        was bothered that he couldn't feel <em>why</em>.
      </Callout>
      <p>
        That's the real lesson of the Monty Hall problem. It isn't hard math. It's that our gut
        sense of probability is bad at noticing when new information is <em>conditional</em> on
        something, like a host who is forbidden from opening the winning door.
      </p>
      <p>Erdős needed a simulation. Let's give you one.</p>
    </div>
  );
}
