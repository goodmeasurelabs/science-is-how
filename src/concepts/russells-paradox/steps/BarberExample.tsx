import { type FC, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Button from "../../../components/Button";
import Callout from "../../../components/Callout";
import { StickFigure } from "../StickFigure/StickFigure";
import { trackInteraction } from "../../../lib/analytics";

const Scene: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-wrap items-start justify-center gap-3 md:flex-nowrap">{children}</div>
);

function BarberAppears() {
  return (
    <Scene>
      <StickFigure beard={true} size={1} speakBubble="I'm the only barber in town. I shave everyone who doesn't shave themself. That's the rule." />
    </Scene>
  );
}

function BeardedManOneApproaches() {
  return (
    <Scene>
      <StickFigure beard={true} size={0.8} />
      <StickFigure beard={true} size={0.75} speakBubble="Hey, I don't shave myself and I could use a shave." />
    </Scene>
  );
}

function BeardedManTwoApproaches() {
  return (
    <Scene>
      <StickFigure beard={true} size={0.8} />
      <StickFigure beard={true} size={0.75} speakBubble="Hey, I don't shave myself and I could use a shave." />
      <StickFigure beard={true} size={0.75} speakBubble="Hey, I ALSO don't shave myself and I could use a shave." />
    </Scene>
  );
}

function BarberShavesTheMenOne() {
  return (
    <Scene>
      <StickFigure beard={true} size={0.8} razer={true} speakBubble="I'm going to shave you both now. That's the rule." />
      <StickFigure beard={true} size={0.75} />
      <StickFigure beard={true} size={0.75} />
    </Scene>
  );
}

function BarberShavesTheMenTwo() {
  return (
    <Scene>
      <StickFigure beard={true} size={0.8} razer={true} speakBubble="BUZZZZ" />
      <StickFigure beard={false} size={0.75} />
      <StickFigure beard={true} size={0.75} />
    </Scene>
  );
}

function BarberShavesTheMenThree() {
  return (
    <Scene>
      <StickFigure beard={true} size={0.8} razer={true} speakBubble="And BUZZZZ" />
      <StickFigure beard={false} size={0.75} />
      <StickFigure beard={false} size={0.75} />
    </Scene>
  );
}

function BarberShavesTheMenFour() {
  return (
    <Scene>
      <StickFigure beard={true} size={0.8} razer={true} />
      <StickFigure beard={false} size={0.6} speakBubble="Thanks! Smooth as a porpoise." />
      <StickFigure beard={false} size={0.6} speakBubble="I'm gonna apply for that corporate job now." />
    </Scene>
  );
}

function BarbersDilemmaOne() {
  return (
    <Scene>
      <StickFigure beard={true} razer={true} size={1} speakBubble="Now I've shaved everyone in town who doesn't shave themself." />
    </Scene>
  );
}

function BarbersDilemmaTwo() {
  return (
    <Scene>
      <StickFigure beard={true} razer={true} size={1} speakBubble="Oh wait, I forgot me! I don't shave myself, therefore I must shave myself." />
    </Scene>
  );
}

function BarberSelfShave() {
  return (
    <Scene>
      <StickFigure beard={true} size={1} razer={true} speakBubble="BUZZZZ" />
    </Scene>
  );
}

function BarberSelfShaveTwo() {
  return (
    <Scene>
      <StickFigure beard={false} razer={true} size={1} speakBubble="Ah. Silky smooth." />
    </Scene>
  );
}

function BarbersDilemmaThree() {
  return (
    <Scene>
      <StickFigure beard={false} razer={true} size={1} speakBubble="Oh no! I shaved myself. The barber only shaves people who DON'T shave themselves. And I'M the barber. So I shouldn't have shaved myself." />
    </Scene>
  );
}

function BarberBeardContentment() {
  return (
    <Scene>
      <StickFigure beard={true} razer={true} size={1} speakBubble="There we are. Beard's back." />
    </Scene>
  );
}

function BarberWithBeardParadox() {
  return (
    <Scene>
      <StickFigure beard={true} razer={true} size={1} speakBubble="Wait a minute... Since I now don't shave myself, I must shave myself." />
    </Scene>
  );
}

function BarberWaitAMinute() {
  return (
    <Scene>
      <StickFigure beard={false} razer={true} size={1} speakBubble="Wait a minute..." />
    </Scene>
  );
}

function BarberRealizesNeedsShave() {
  return (
    <Scene>
      <StickFigure beard={true} razer={true} size={1} speakBubble="Oh shoot, now I gotta shave myself." />
    </Scene>
  );
}

function InfiniteLoopError() {
  return (
    <div className="w-auto rounded-2xl bg-red-400 px-6 py-10 text-white shadow-card">
      <h2 className="text-white">Error: Maximum call stack size exceeded</h2>
      <p className="mt-3">
        The barber is stuck in an infinite loop of shaving himself and then not shaving himself.
      </p>
      <p className="mt-3 text-sm text-white/90">
        That's the paradox. "The barber who shaves exactly those who don't shave themselves" is
        the set <code className="text-white">R</code> wearing a moustache. Such a barber can't
        exist, and neither can <code className="text-white">R</code>.
      </p>
    </div>
  );
}

const miniSteps: FC[] = [
  BarberAppears,
  BeardedManOneApproaches,
  BeardedManTwoApproaches,
  BarberShavesTheMenOne,
  BarberShavesTheMenTwo,
  BarberShavesTheMenThree,
  BarberShavesTheMenFour,
  BarbersDilemmaOne,
  BarbersDilemmaTwo,
  BarberSelfShave,
  BarberSelfShaveTwo,
  BarbersDilemmaThree,
  BarberBeardContentment,
  BarberWithBeardParadox,
];

const infiniteLoopSteps: FC[] = [
  BarberSelfShave,
  BarberSelfShaveTwo,
  BarberWaitAMinute,
  BarberBeardContentment,
  BarberRealizesNeedsShave,
];

const INFINITE_LOOP_LIMIT = 1500;
const INFINITE_LOOP_INITIAL_DELAY = 3000;
const INFINITE_LOOP_DELAY_MIN = 2;
const INFINITE_LOOP_DELAY_DECREMENT_PER_ROUND = 200;
const INFINITE_LOOP_DELAY_DECREMENT_PER_STEP = 100;
const DELAY_MULTIPLIER = 1.15;

export default function BarberExample() {
  const [currentMiniStep, setCurrentMiniStep] = useState(0);
  const [currentInfiniteLoopStep, setCurrentInfiniteLoopStep] = useState(0);
  const [totalInfiniteLoopStep, setTotalInfiniteLoopStep] = useState(0);
  const [infiniteLoopDelay, setInfiniteLoopDelay] = useState(INFINITE_LOOP_INITIAL_DELAY);
  const [infiniteLoopDelayDecrementPerRound, setInfiniteLoopDelayDecrementPerRound] = useState(
    INFINITE_LOOP_DELAY_DECREMENT_PER_ROUND,
  );
  const isInfiniteLoopTime = currentMiniStep === miniSteps.length - 1;
  const isInfiniteLoopFinished = totalInfiniteLoopStep >= INFINITE_LOOP_LIMIT;

  const go = (i: number) => {
    setCurrentMiniStep(i);
    trackInteraction({ story: "russells-paradox", widget: "barber", action: "scene", value: i });
  };

  // Once the paradox kicks in, the barber loops faster and faster until the "stack" blows.
  useEffect(() => {
    if (!isInfiniteLoopTime || isInfiniteLoopFinished) return;
    const intervalId = window.setInterval(() => {
      if (currentInfiniteLoopStep % infiniteLoopSteps.length === 0 && currentInfiniteLoopStep !== 0) {
        setInfiniteLoopDelay((d) => Math.max(d - infiniteLoopDelayDecrementPerRound, INFINITE_LOOP_DELAY_MIN));
        setInfiniteLoopDelayDecrementPerRound((d) => d * DELAY_MULTIPLIER);
      } else {
        setInfiniteLoopDelay((d) => Math.max(d - INFINITE_LOOP_DELAY_DECREMENT_PER_STEP, INFINITE_LOOP_DELAY_MIN));
      }
      setTotalInfiniteLoopStep((s) => s + 1);
      setCurrentInfiniteLoopStep((s) => (s + 1) % infiniteLoopSteps.length);
    }, infiniteLoopDelay);
    return () => clearInterval(intervalId);
  }, [
    currentInfiniteLoopStep,
    isInfiniteLoopTime,
    infiniteLoopDelay,
    isInfiniteLoopFinished,
    infiniteLoopDelayDecrementPerRound,
  ]);

  useEffect(() => {
    if (isInfiniteLoopFinished) {
      trackInteraction({ story: "russells-paradox", widget: "barber", action: "stack_overflow" });
    }
  }, [isInfiniteLoopFinished]);

  const reset = () => {
    setCurrentMiniStep(0);
    setCurrentInfiniteLoopStep(0);
    setTotalInfiniteLoopStep(0);
    setInfiniteLoopDelay(INFINITE_LOOP_INITIAL_DELAY);
    setInfiniteLoopDelayDecrementPerRound(INFINITE_LOOP_DELAY_DECREMENT_PER_ROUND);
  };

  const CurrentScene = miniSteps[currentMiniStep];
  const LoopScene = infiniteLoopSteps[currentInfiniteLoopStep];

  return (
    <div className="w-full overflow-x-hidden">
      <div className="story-prose">
        <h2>The Barber</h2>
        <p>
          Russell himself used this version to explain the paradox to non-mathematicians. Consider a
          village with a single barber. <strong>The barber shaves all those, and only those, who do
          not shave themselves.</strong> Who shaves the barber?
        </p>
        <p className="text-center text-sm text-muted">Click Ok to play it out.</p>
      </div>

      {!isInfiniteLoopTime && (
        <div className="mt-4 flex flex-col items-center gap-2 md:flex-row md:justify-center">
          <div className="self-center">
            {currentMiniStep > 0 && (
              <Button size="sm" variant="ghost" onClick={() => go(currentMiniStep - 1)}>
                ← Previous
              </Button>
            )}
          </div>
          <div className="block self-center md:hidden">
            <Button size="sm" variant="primary" onClick={() => go(currentMiniStep + 1)}>
              Ok
            </Button>
          </div>
          <div className="min-h-[14rem] w-full md:min-h-[20rem] md:w-auto">
            <Fade key={currentMiniStep} duration={800} triggerOnce>
              <CurrentScene />
            </Fade>
          </div>
          <div className="hidden self-center md:block">
            <Button size="sm" variant="primary" onClick={() => go(currentMiniStep + 1)}>
              Ok
            </Button>
          </div>
        </div>
      )}

      {isInfiniteLoopTime && !isInfiniteLoopFinished && (
        <div className="mt-4 flex min-h-[14rem] justify-center md:min-h-[20rem]">
          <LoopScene />
        </div>
      )}

      {isInfiniteLoopTime && isInfiniteLoopFinished && (
        <div className="mx-auto mt-8 flex w-full max-w-lg flex-col items-center gap-6">
          <InfiniteLoopError />
          <div className="flex gap-4">
            <Button icon onClick={reset}>
              Reset
            </Button>
            <Button icon variant="primary" to="/stories">
              More stories
            </Button>
          </div>
          <div className="story-prose">
            <Callout tone="info" title="Barber vs. set">
              "Shaves himself" is "contains itself." "The barber" is <code>R</code>. The village rule
              is the definition of <code>R</code>. Same paradox, better haircut.
            </Callout>
          </div>
        </div>
      )}
    </div>
  );
}
