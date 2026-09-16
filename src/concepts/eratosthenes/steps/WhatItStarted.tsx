import Callout from "../../../components/Callout";

export default function WhatItStarted() {
  return (
    <div className="story-prose">
      <h2>What It Started</h2>
      <p>
        You would think a number this good would stick. It didn't. About 150 years later the
        philosopher Posidonius repeated the trick using a star instead of the Sun and got a smaller
        Earth. The astronomer Ptolemy, whose <em>Geography</em> became the standard reference for
        over a thousand years, went with the smaller figure.
      </p>
      <p>
        That small Earth had consequences. When Christopher Columbus pitched his voyage in the
        1480s, his arithmetic leaned on the low estimates (and on a generous guess at how far Asia
        stretched east). By his reckoning Japan was a few thousand kilometres west of Spain. The
        experts who turned him down weren't flat-earthers. They were, roughly, Eratosthenes fans,
        and they were right about the distance. Columbus was saved by a continent nobody had
        budgeted for.
      </p>
      <Callout tone="history" title="The measurement that kept being right">
        Modern surveys put the Earth's circumference through the poles at 40,008 km. The metre
        itself was originally defined in the 1790s as one ten-millionth of the distance from the
        pole to the equator, which is why the number comes out so close to 40,000.
      </Callout>
      <h3>Do it yourself</h3>
      <p>
        The experiment is still run today. Every year around the equinox, thousands of schools in
        the "Eratosthenes Experiment" measure a stick's shadow at local noon and pair up with a
        school on another latitude to work out the Earth's size. All you need is:
      </p>
      <ul>
        <li>a vertical stick and a sunny day,</li>
        <li>the shadow length at local solar noon (shortest shadow of the day),</li>
        <li>a friend a few hundred kilometres north or south doing the same thing,</li>
        <li>and the distance between you.</li>
      </ul>
      <p>
        The angle comes from the shadow (<code>angle = arctan(shadow ÷ stick)</code>), and the rest
        is the calculation from the last step. Two sticks, one shadow, one planet. Beta would
        approve.
      </p>
    </div>
  );
}
