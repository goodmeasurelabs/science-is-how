import Callout from "../../../components/Callout";

export default function DoingTheMath() {
  return (
    <div className="story-prose">
      <h2>Doing the Math</h2>
      <p>Here is the whole calculation. It fits on a napkin.</p>
      <ol>
        <li>
          The shadow in Alexandria says the Sun is <strong>7.2°</strong> off vertical. A full
          circle is 360°, so 7.2° is <strong>1/50</strong> of the way around.
        </li>
        <li>
          Syene to Alexandria is about <strong>5,000 stadia</strong>. (He may have used the
          figures of <em>bematists</em>, professional surveyors trained to walk in even paces and
          count.)
        </li>
        <li>
          If 5,000 stadia is 1/50 of the circle, the whole circle is 50 × 5,000 ={" "}
          <strong>250,000 stadia</strong>.
        </li>
      </ol>
      <p>
        Later writers report that he nudged the figure to <strong>252,000 stadia</strong>, a number
        that divides neatly by 60 and by 360, giving a tidy 700 stadia per degree. Ancient
        astronomers liked round numbers as much as we do.
      </p>
      <h3>So... how close was he?</h3>
      <p>
        That depends on a question historians still argue about: how long was his{" "}
        <strong>stadion</strong>? Several were in use.
      </p>
      <div className="not-prose my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th className="py-2 pr-4">Stadion</th>
              <th className="py-2 pr-4">252,000 stadia in km</th>
              <th className="py-2">vs. 40,008 km</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            <tr className="border-b border-line/60">
              <td className="py-2 pr-4">157 m (Egyptian)</td>
              <td className="py-2 pr-4">about 39,600 km</td>
              <td className="py-2 font-bold text-emerald-600 dark:text-emerald-400">about 1% low</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">185 m (Attic)</td>
              <td className="py-2 pr-4">about 46,600 km</td>
              <td className="py-2 font-bold text-amber-600 dark:text-amber-400">about 16% high</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Either way: a man who never left the Mediterranean measured a planet to within a few
        percent, in the third century BC, with a shadow.
      </p>
      <Callout tone="info" title="Why it worked despite sloppy inputs">
        Syene isn't exactly due south of Alexandria, isn't exactly on the Tropic, and 5,000 stadia
        was a round estimate. Some of those errors happened to cancel. But the <em>method</em> is
        flawless: parallel sunlight turns a local shadow into a global angle. Good ideas survive
        bad data.
      </Callout>
    </div>
  );
}
