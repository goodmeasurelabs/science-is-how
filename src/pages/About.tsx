import Button from "../components/Button";
import MonkeyScope from "../assets/monkey-scope.webp";

export default function About() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
      <div className="story-prose">
        <h1>
          "Science is How" is what<span className="text-accent">?</span>
        </h1>
        <img src={MonkeyScope} alt="A cartoon monkey peering into a microscope" className="illo w-48" width={1024} height={1024} />
        <p>
          Science is How is a small collection of interactive stories about big ideas. Each one takes a
          famous moment from the history of science or mathematics, keeps the people and the drama, and
          lets you play with the idea until it makes sense.
        </p>
        <p>
          The rules are simple. No prerequisites. Short steps. Something to click on in every story.
          Cartoons wherever a cartoon helps. And when a paradox breaks your brain a little, that's the
          point.
        </p>
        <h3>Who makes this?</h3>
        <p>
          Sean Tarzy, a software engineer who thinks the story of how an idea was discovered is usually
          more memorable than the idea itself. The site is open source on{" "}
          <a href="https://github.com/seantarzy/science-is-how" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
        <h3>Found a mistake? Have a story in mind?</h3>
        <p>
          Use the feedback button in the corner of any page. Corrections, requests and "actually, it was
          1936" are all welcome.
        </p>
        <div className="mt-8 flex justify-center">
          <Button to="/stories" variant="primary" icon>
            Browse the stories
          </Button>
        </div>
      </div>
    </main>
  );
}
