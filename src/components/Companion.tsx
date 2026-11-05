import "./Companion.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { createPenguinEngine, type PenguinEngine } from "./companion/engine";
import type { Speech } from "./companion/dialogue";

export default function Companion() {
  const [visible, setVisible] = useState(true);
  const [speech, setSpeech] = useState<Speech | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const engine = useRef<PenguinEngine | null>(null);

  useEffect(() => {
    if (!visible || !root.current || !button.current) return;
    const instance = createPenguinEngine({
      root: root.current,
      button: button.current,
      onSpeech: setSpeech,
    });
    engine.current = instance;
    return () => {
      instance.destroy();
      engine.current = null;
    };
  }, [visible]);

  useLayoutEffect(() => {
    if (!speech || !bubble.current) return;
    const update = () => engine.current?.layoutSpeech();
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bubble.current);
    return () => observer.disconnect();
  }, [speech]);

  return (
    <>
      <button
        type="button"
        className="companion-toggle"
        aria-pressed={visible}
        onClick={() => {
          setSpeech(null);
          setVisible(!visible);
        }}
      >
        {visible ? (
          <>
            <CloseRoundedIcon /> Hide Mr. Penguin
          </>
        ) : (
          "Show Mr. Penguin"
        )}
      </button>
      {visible ? (
        <div
          ref={root}
          className="penguin-companion"
          data-state="idle"
          data-facing="front"
          data-talking="false"
        >
          {speech ? (
            <div
              ref={bubble}
              key={speech.id}
              className="penguin-speech"
              data-kind={speech.kind}
              role="status"
              aria-live={speech.kind === "idle" ? "off" : "polite"}
              aria-atomic="true"
            >
              <span className="penguin-speech-copy">{speech.text}</span>
              <span className="penguin-speech-tail" aria-hidden="true" />
            </div>
          ) : null}
          <span className="penguin-parachute" aria-hidden="true" />
          <button
            ref={button}
            type="button"
            className="companion-sprite"
            title="Click to tickle. Drag to lift and throw!"
            aria-label="Penguin companion. Click to tickle, drag to lift and throw, or press Arrow Up to toss."
            onPointerDown={(event) => engine.current?.pointerDown(event)}
            onPointerMove={(event) => engine.current?.pointerMove(event)}
            onPointerUp={(event) => engine.current?.release(event)}
            onPointerCancel={(event) => engine.current?.release(event)}
            onLostPointerCapture={() => engine.current?.release()}
            onClick={(event) => {
              if (event.detail === 0) engine.current?.activate();
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                engine.current?.toss();
              }
            }}
          >
            <span className="penguin-waddle" aria-hidden="true">
              <span className="penguin-breathe">
                <span className="penguin-squeeze">
                  <span className="penguin-art" />
                </span>
              </span>
            </span>
          </button>
        </div>
      ) : null}
    </>
  );
}
