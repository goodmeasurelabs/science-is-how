import { useState, type ReactNode } from "react";
import { Fade } from "react-awesome-reveal";
import Button from "./Button";

interface MiniStepsProps {
  /** Scenes revealed one at a time with an "Ok" button. */
  scenes: ReactNode[];
  /** Label of the advance button. */
  nextLabel?: string;
  /** Called whenever the scene changes; handy for analytics. */
  onChange?: (index: number) => void;
  /** Rendered once the last scene is reached (e.g. a punchline or a Reset). */
  ending?: ReactNode;
  className?: string;
}

/**
 * The "click Ok to see what happens next" pattern used throughout the site.
 * Keeps the reader's hand on the wheel instead of dumping the whole story at once.
 */
export default function MiniSteps({
  scenes,
  nextLabel = "Ok",
  onChange,
  ending,
  className = "",
}: MiniStepsProps) {
  const [index, setIndex] = useState(0);
  const go = (i: number) => {
    setIndex(i);
    onChange?.(i);
  };
  const last = index === scenes.length - 1;
  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <div className="w-full min-h-[8rem]">
        <Fade key={index} duration={700} triggerOnce>
          <div>{scenes[index]}</div>
        </Fade>
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm" variant="ghost" onClick={() => go(index - 1)} disabled={index === 0}>
          ← Previous
        </Button>
        <span className="text-xs text-muted tabular-nums">
          {index + 1} / {scenes.length}
        </span>
        {!last ? (
          <Button size="sm" variant="primary" onClick={() => go(index + 1)}>
            {nextLabel}
          </Button>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => go(0)}>
            Restart
          </Button>
        )}
      </div>
      {last && ending}
    </div>
  );
}
