import type { PointerEvent as ReactPointerEvent } from "react";
import { chooseLine, type Speech, type SpeechKind } from "./dialogue";
import {
  advanceFlight,
  clamp,
  floorY,
  PENGUIN_SIZE,
  type Flight,
} from "./physics";

type Mode =
  "idle" | "walking" | "dragging" | "falling" | "parachuting" | "landing";
type Facing = "front" | "left" | "right";
type Drag = {
  id: number;
  dx: number;
  dy: number;
  startX: number;
  startY: number;
  time: number;
  moved: boolean;
  lifted: boolean;
  airborne: boolean;
};
type Options = {
  root: HTMLDivElement;
  button: HTMLButtonElement;
  onSpeech: (speech: Speech | null) => void;
};

export function createPenguinEngine({ root, button, onSpeech }: Options) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const bounds = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const body: Flight = { x: Math.min(148, Math.max(0, bounds().width - PENGUIN_SIZE)), y: floorY(bounds()), vx: 0, vy: 0, bounces: 0 };
  let mode: Mode = "idle";
  let drag: Drag | null = null;
  let disposed = false;
  let frame = 0;
  let lastFrame = 0;
  let walkUntil = 0;
  let actionTimer: number | undefined;
  let speechTimer: number | undefined;
  let flightSpeechTimer: number | undefined;
  let flightFollowUpScheduled = false;
  let lastInteraction = -Infinity;
  let lastSpoken = -Infinity;
  let speechId = 0;
  let bubbleWidth = 200;
  let bubbleHeight = 54;
  const previous: Partial<Record<SpeechKind, string>> = {};
  const timers = new Set<number>();
  const random = (min: number, max: number) =>
    min + Math.random() * (max - min);

  function later(callback: () => void, delay: number) {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      if (!disposed) callback();
    }, delay);
    timers.add(timer);
    return timer;
  }
  function clear(timer?: number) {
    if (timer === undefined) return;
    window.clearTimeout(timer);
    timers.delete(timer);
  }
  function setMode(next: Mode) {
    mode = next;
    root.dataset.state = next;
  }
  function face(facing: Facing) {
    root.dataset.facing = facing;
    paint();
  }
  function paint() {
    root.style.transform = `translate3d(${body.x}px, ${body.y}px, 0)`;
    let side = root.dataset.facing === "left" ? "left" : "right";
    const rightSpace = window.innerWidth - body.x - 64 - 12;
    const leftSpace = body.x + 8 - 12;
    // Turn toward available room at an edge so speech still follows his face.
    if (root.dataset.talking === "true" &&
      (side === "left" ? leftSpace : rightSpace) < 96 &&
      (side === "left" ? rightSpace : leftSpace) >= 96) {
      side = side === "left" ? "right" : "left";
      root.dataset.facing = side;
      if (mode === "walking") body.vx = Math.abs(body.vx) * (side === "left" ? -1 : 1);
    }
    const maxWidth = Math.min(230, Math.max(96, side === "left" ? leftSpace : rightSpace));
    const width = Math.min(bubbleWidth, maxWidth);
    const left = side === "left" ? 8 - width : 64;
    const top = clamp(26 - bubbleHeight / 2, 10 - body.y, window.innerHeight - body.y - bubbleHeight - 10);
    root.dataset.speechSide = side;
    root.style.setProperty("--bubble-max-width", `${maxWidth}px`);
    root.style.setProperty("--bubble-left", `${left}px`);
    root.style.setProperty("--bubble-top", `${top}px`);
    root.style.setProperty("--bubble-tail-top", `${clamp(26 - top - 9, 9, bubbleHeight - 27)}px`);
    root.style.setProperty(
      "--flight-tilt",
      `${clamp(body.vx / 60, -10, 10)}deg`,
    );
  }
  function layoutSpeech() {
    const bubble = root.querySelector<HTMLElement>(".penguin-speech");
    if (!bubble) return;
    bubbleWidth = bubble.offsetWidth;
    bubbleHeight = bubble.offsetHeight;
    paint();
  }
  function talk(kind: SpeechKind) {
    clear(speechTimer);
    const text = chooseLine(kind, previous[kind]);
    previous[kind] = text;
    lastSpoken = performance.now();
    root.dataset.talking = "true";
    if (kind === "parachute" && text === "wait i kind of like this") {
      root.dataset.happy = "true";
      root.dataset.scared = "false";
      face("front");
    }
    onSpeech({ text, kind, id: ++speechId });
    paint();
    speechTimer = later(
      () => {
        if (kind === "lifted" && drag?.lifted) return;
        root.dataset.talking = "false";
        onSpeech(null);
      },
      clamp(1600 + text.length * 42, 2400, 5300),
    );
  }
  function idleIn(delay = random(1800, 4500)) {
    clear(actionTimer);
    actionTimer = later(idleAction, delay);
  }
  function stopFrames() {
    window.cancelAnimationFrame(frame);
    frame = 0;
  }
  function requestFrame() {
    if (frame || disposed || document.hidden) return;
    lastFrame = performance.now();
    frame = window.requestAnimationFrame(step);
  }
  function settle() {
    clear(flightSpeechTimer);
    stopFrames();
    body.y = floorY(bounds());
    body.vx = 0;
    body.vy = 0;
    root.dataset.scared = "false";
    root.dataset.happy = "false";
    root.dataset.parachute = "false";
    face("front");
    setMode("landing");
    paint();
    later(() => {
      if (mode === "landing") talk("landing");
    }, 150);
    later(() => {
      if (mode !== "landing") return;
      setMode("idle");
      idleIn(3500);
    }, 500);
  }
  function step(now: number) {
    frame = 0;
    if (disposed || drag || document.hidden) return;
    const dt = Math.min((now - lastFrame) / 1000, 0.034);
    lastFrame = now;
    if (mode === "walking") {
      body.x += body.vx * dt;
      const right = Math.max(12, window.innerWidth - PENGUIN_SIZE - 12);
      const left = Math.min(126, right);
      if (body.x < left || body.x > right) {
        body.x = clamp(body.x, left, right);
        body.vx *= -1;
        face(body.vx < 0 ? "left" : "right");
      }
      body.y = floorY(bounds());
      if (now >= walkUntil || preference.matches) {
        body.vx = 0;
        setMode("idle");
        face(Math.random() > 0.45 ? "front" : (root.dataset.facing as Facing));
        idleIn();
      }
    } else if (mode === "falling" || mode === "parachuting") {
      if (preference.matches) {
        settle();
        return;
      }
      const result = advanceFlight(body, dt, bounds());
      root.dataset.parachute = String(result.parachute);
      setMode(result.parachute ? "parachuting" : "falling");
      if (result.parachute && !flightFollowUpScheduled) {
        flightFollowUpScheduled = true;
        flightSpeechTimer = later(() => {
          if (mode === "parachuting" && !body.parachuteCut) talk("parachute");
        }, random(900, 1300));
      }
      if (result.landed) {
        settle();
        return;
      }
    } else return;
    paint();
    if (mode === "walking" || mode === "falling" || mode === "parachuting")
      frame = window.requestAnimationFrame(step);
  }
  function idleAction() {
    if (document.hidden || drag || mode !== "idle") {
      idleIn();
      return;
    }
    if (!preference.matches && Math.random() < 0.68) {
      const direction =
        body.x < 145
          ? 1
          : body.x > window.innerWidth - PENGUIN_SIZE - 30
            ? -1
            : Math.random() < 0.5
              ? -1
              : 1;
      body.vx = direction * random(22, 35);
      walkUntil = performance.now() + random(1800, 4000);
      face(direction < 0 ? "left" : "right");
      setMode("walking");
      requestFrame();
    } else {
      face(
        (["front", "left", "right"] as const)[Math.floor(Math.random() * 3)],
      );
      idleIn();
    }
  }
  function idleSpeech() {
    const now = performance.now();
    if (
      !document.hidden &&
      (mode === "idle" || mode === "walking") &&
      !drag &&
      now - lastInteraction > 8000 &&
      now - lastSpoken > 8000
    )
      talk("idle");
    later(idleSpeech, random(12000, 22000));
  }
  function blink() {
    if (
      mode === "idle" &&
      root.dataset.facing === "front" &&
      root.dataset.talking !== "true"
    ) {
      root.dataset.blink = "true";
      later(() => {
        root.dataset.blink = "false";
      }, 150);
    }
    later(blink, random(4500, 8500));
  }
  function squeeze() {
    root.dataset.squeezing = "false";
    // Restart the CSS reaction for every new click.
    void button.offsetWidth;
    root.dataset.squeezing = "true";
    later(() => {
      root.dataset.squeezing = "false";
    }, 320);
  }
  function tickle() {
    if (mode === "falling" || mode === "parachuting" || drag) return;
    lastInteraction = performance.now();
    stopFrames();
    body.vx = 0;
    setMode("idle");
    face("front");
    squeeze();
    talk("clicked");
    idleIn(4000);
  }
  function fly(cutParachute = body.parachuteCut ?? false) {
    clear(actionTimer);
    clear(flightSpeechTimer);
    body.bounces = 0;
    body.parachuteCut = cutParachute;
    flightFollowUpScheduled = false;
    root.dataset.happy = "false";
    root.dataset.scared = "true";
    if (cutParachute) root.dataset.parachute = "false";
    setMode("falling");
    talk("thrown");
    if (preference.matches) {
      settle();
      return;
    }
    requestFrame();
  }
  function pointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || drag) return;
    lastInteraction = performance.now();
    const airborne = mode === "falling" || mode === "parachuting" || body.y < floorY(bounds()) - 2;
    body.parachuteCut = airborne;
    root.dataset.parachute = "false";
    if (airborne) {
      root.dataset.happy = "false";
      root.dataset.scared = "true";
    }
    stopFrames();
    clear(actionTimer);
    clear(flightSpeechTimer);
    drag = {
      id: event.pointerId,
      dx: event.clientX - body.x,
      dy: event.clientY - body.y,
      startX: event.clientX,
      startY: event.clientY,
      time: performance.now(),
      moved: false,
      lifted: false,
      airborne,
    };
    body.vx = 0;
    body.vy = 0;
    button.setPointerCapture(event.pointerId);
    root.dataset.pressed = "true";
    squeeze();
  }
  function pointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!drag || drag.id !== event.pointerId) return;
    const now = performance.now();
    if (
      !drag.moved &&
      Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 5
    )
      return;
    drag.moved = true;
    setMode("dragging");
    root.dataset.squeezing = "false";
    const dt = Math.max((now - drag.time) / 1000, 0.016);
    const floor = floorY(bounds());
    const x = clamp(
      event.clientX - drag.dx,
      0,
      window.innerWidth - PENGUIN_SIZE,
    );
    const y = clamp(
      event.clientY - drag.dy,
      Math.min(96, Math.max(0, floor - 30)),
      floor,
    );
    body.vx = clamp(body.vx * 0.3 + ((x - body.x) / dt) * 0.7, -900, 900);
    body.vy = clamp(body.vy * 0.3 + ((y - body.y) / dt) * 0.7, -950, 950);
    body.x = x;
    body.y = y;
    if (!drag.lifted && y < floor - 12) {
      drag.lifted = true;
      root.dataset.happy = "false";
      root.dataset.scared = "true";
      face("front");
      talk("lifted");
    }
    root.dataset.parachute = "false";
    drag.time = now;
    paint();
  }
  function release(event?: ReactPointerEvent<HTMLButtonElement>) {
    if (!drag || (event && event.pointerId !== drag.id)) return;
    const previousDrag = drag;
    drag = null;
    root.dataset.pressed = "false";
    if (button.hasPointerCapture(previousDrag.id))
      button.releasePointerCapture(previousDrag.id);
    if (!previousDrag.moved && previousDrag.airborne) {
      fly(true);
      return;
    }
    if (!previousDrag.moved && body.y >= floorY(bounds()) - 2) {
      tickle();
      return;
    }
    if (performance.now() - previousDrag.time > 120) {
      body.vx *= 0.25;
      body.vy = 0;
    }
    if (body.y >= floorY(bounds()) - 5 && Math.abs(body.vx) > 80)
      body.vy = -180;
    // A completed drag starts a fresh flight, even after a canopy was dismissed.
    fly(false);
  }
  function toss() {
    if (drag) return;
    lastInteraction = performance.now();
    stopFrames();
    body.vy = -610;
    body.vx = random(-100, 100);
    fly(false);
  }
  function activate() {
    if (mode === "falling" || mode === "parachuting") fly(true);
    else tickle();
  }
  function resize() {
    body.x = clamp(body.x, 0, window.innerWidth - PENGUIN_SIZE);
    body.y =
      mode === "idle" || mode === "walking" || mode === "landing"
        ? floorY(bounds())
        : clamp(body.y, 0, floorY(bounds()));
    paint();
  }
  function visibility() {
    if (document.hidden) stopFrames();
    else if (mode === "walking" || mode === "falling" || mode === "parachuting")
      requestFrame();
  }
  function reduceMotion() {
    if (!preference.matches) return;
    if (mode === "falling" || mode === "parachuting") settle();
    else if (mode === "walking") {
      stopFrames();
      setMode("idle");
      body.vx = 0;
      idleIn();
    }
  }

  setMode("idle");
  face("front");
  root.dataset.scared = "false";
  root.dataset.happy = "false";
  root.dataset.parachute = "false";
  root.dataset.talking = "false";
  paint();
  root.dataset.ready = "true";
  idleIn(4500);
  later(idleSpeech, random(1400, 2400));
  later(blink, 5500);
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", visibility);
  preference.addEventListener("change", reduceMotion);

  return {
    pointerDown,
    pointerMove,
    release,
    tickle,
    activate,
    toss,
    layoutSpeech,
    destroy() {
      disposed = true;
      stopFrames();
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", reduceMotion);
    },
  };
}

export type PenguinEngine = ReturnType<typeof createPenguinEngine>;
