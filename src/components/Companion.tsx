import "./Companion.css";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const WIDTH = 96;
const HEIGHT = 144;

export default function Companion() {
  const [visible, setVisible] = useState(true);
  const sprite = useRef<HTMLButtonElement>(null);
  const motion = useRef({
    x: 24,
    y: 0,
    vx: 0,
    vy: 0,
    frame: 0,
    last: 0,
    bounces: 0,
  });
  const drag = useRef<{
    id: number;
    dx: number;
    dy: number;
    time: number;
  } | null>(null);

  useEffect(() => {
    if (!visible) return;
    const state = motion.current;
    const place = () => {
      state.x = Math.max(0, Math.min(state.x, window.innerWidth - WIDTH));
      state.y = Math.max(0, Math.min(state.y, window.innerHeight - HEIGHT - 8));
      if (sprite.current)
        sprite.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
    };
    state.y = window.innerHeight - HEIGHT - 8;
    place();
    const resize = () => {
      if (sprite.current?.dataset.state === "grounded")
        state.y = window.innerHeight - HEIGHT - 8;
      place();
    };
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(state.frame);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  function paint() {
    const state = motion.current;
    if (sprite.current)
      sprite.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
  }

  function fall() {
    const state = motion.current;
    window.cancelAnimationFrame(state.frame);
    state.last = performance.now();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const step = (now: number) => {
      if (drag.current || !sprite.current) return;
      const dt = Math.min((now - state.last) / 1000, 0.035);
      state.last = now;
      const floor = window.innerHeight - HEIGHT - 8;
      if (reduced) {
        state.y = floor;
        state.vx = 0;
        state.vy = 0;
      } else {
        const canopy = state.vy >= 0 && floor - state.y > 55;
        sprite.current.dataset.state = canopy ? "parachuting" : "falling";
        state.vy = Math.min(state.vy + 1100 * dt, canopy ? 155 : 800);
        state.x += state.vx * dt;
        state.y += state.vy * dt;
        state.vx *= Math.exp(-2.5 * dt);
        if (state.x < 0 || state.x > window.innerWidth - WIDTH) {
          state.x = Math.max(0, Math.min(state.x, window.innerWidth - WIDTH));
          state.vx *= -0.4;
        }
        state.y = Math.max(0, state.y);
      }
      if (state.y >= floor) {
        state.y = floor;
        if (!reduced && state.vy > 200 && state.bounces === 0) {
          state.vy *= -0.22;
          state.bounces += 1;
          sprite.current.dataset.state = "falling";
          paint();
          state.frame = window.requestAnimationFrame(step);
          return;
        }
        sprite.current.dataset.state = "grounded";
        paint();
        return;
      }
      paint();
      state.frame = window.requestAnimationFrame(step);
    };
    state.frame = window.requestAnimationFrame(step);
  }

  function pointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || drag.current) return;
    const state = motion.current;
    window.cancelAnimationFrame(state.frame);
    drag.current = {
      id: event.pointerId,
      dx: event.clientX - state.x,
      dy: event.clientY - state.y,
      time: performance.now(),
    };
    state.vx = 0;
    state.vy = 0;
    state.bounces = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.state = "dragging";
  }

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    const state = motion.current;
    const now = performance.now();
    const dt = Math.max((now - drag.current.time) / 1000, 0.016);
    const x = Math.max(
      0,
      Math.min(event.clientX - drag.current.dx, window.innerWidth - WIDTH),
    );
    const y = Math.max(
      0,
      Math.min(
        event.clientY - drag.current.dy,
        window.innerHeight - HEIGHT - 8,
      ),
    );
    state.vx = Math.max(-650, Math.min((x - state.x) / dt, 650));
    state.vy = Math.max(-650, Math.min((y - state.y) / dt, 650));
    state.x = x;
    state.y = y;
    drag.current.time = now;
    paint();
  }

  function pointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    fall();
  }

  return (
    <>
      <button
        className="companion-toggle"
        onClick={() => setVisible(!visible)}
        aria-pressed={visible}
      >
        {visible ? (
          <>
            <CloseRoundedIcon /> Hide companion
          </>
        ) : (
          "Show companion"
        )}
      </button>
      {visible ? (
        <button
          ref={sprite}
          type="button"
          className="companion-sprite"
          data-state="grounded"
          aria-label="Purple companion: drag to lift, release to parachute, or press Enter to hop"
          title="Drag me up and let go!"
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
          onLostPointerCapture={() => {
            if (drag.current) {
              drag.current = null;
              fall();
            }
          }}
          onClick={(event) => {
            if (event.detail !== 0) return;
            motion.current.vy = -570;
            motion.current.bounces = 0;
            fall();
          }}
        />
      ) : null}
    </>
  );
}
