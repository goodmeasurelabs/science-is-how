import { useIsMobile } from "../../../lib/useIsMobile";
import "./StickFigure.css";

/** The unscaled drawing box the body parts are positioned in. */
const BOX_W = 300;
const BOX_H = 400;

/** A CSS stick figure. Optional beard, razor and speech bubble. */
export function StickFigure({
  beard = false,
  razer = false,
  speakBubble,
  size = 0.8,
}: {
  beard: boolean;
  razer?: boolean;
  speakBubble?: string;
  size?: number;
}) {
  const isMobile = useIsMobile();
  const s = size * (isMobile ? 0.4 : 0.75);
  return (
    <div className="stick-figure flex items-start gap-2">
      <div
        className="wrapper"
        style={{ transform: `scale(${s})`, transformOrigin: "top left", width: BOX_W * s, height: BOX_H * s }}
        aria-hidden
      >
        <div className="head">{beard && <div className="beard"></div>}</div>
        <div className="torso"></div>
        <div className="leftarm"></div>
        <div className="rightarm">{razer && <div className="razer"></div>}</div>
        <div className="leftleg"></div>
        <div className="leftfoot"></div>
        <div className="rightleg"></div>
        <div className="rightfoot"></div>
      </div>
      {speakBubble && (
        <div className="bubble-wrapper">
          <p className="bubble speech">{speakBubble}</p>
        </div>
      )}
    </div>
  );
}
