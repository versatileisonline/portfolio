export const PENGUIN_SIZE = 72;
// The feet end at row 334 of each 362px sprite cell, before its transparent padding.
export const PENGUIN_FOOT_Y = (334 / 362) * PENGUIN_SIZE;
export type Flight = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bounces: number;
  parachuteCut?: boolean;
};
export type Bounds = { width: number; height: number };
export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, Math.max(min, max)));

export function floorY(bounds: Bounds) {
  return Math.max(0, bounds.height - PENGUIN_FOOT_Y);
}

export function advanceFlight(body: Flight, dt: number, bounds: Bounds) {
  const floor = floorY(bounds);
  const top = Math.min(96, Math.max(0, floor - 30));
  const parachute = !body.parachuteCut && body.vy >= 0 && floor - body.y > 40;
  body.vy = Math.min(body.vy + 850 * dt, parachute ? 100 : 550);
  body.x += body.vx * dt;
  body.y += body.vy * dt;
  body.vx *= Math.exp(-1.8 * dt);
  const right = Math.max(0, bounds.width - PENGUIN_SIZE);
  if (body.x < 0 || body.x > right) {
    body.x = clamp(body.x, 0, right);
    body.vx *= -0.35;
  }
  if (body.y < top) {
    body.y = top;
    body.vy = Math.max(0, body.vy);
  }
  if (body.y >= floor && body.vy >= 0) {
    body.y = floor;
    if (body.vy > 180 && body.bounces === 0) {
      body.vy *= -0.2;
      body.bounces += 1;
      return { landed: false, parachute: false };
    }
    body.vx = 0;
    body.vy = 0;
    return { landed: true, parachute: false };
  }
  return { landed: false, parachute };
}
