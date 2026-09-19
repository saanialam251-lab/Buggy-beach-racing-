import type { CarProfile } from '../data/cars';

export type DriveInput = { throttle: number; brake: number; steering: number; nitro: boolean; handbrake?: boolean };
export type DriveState = { speed: number; distance: number; heading: number; nitro: number; drift: number; lap: number; checkpoint: number };

export const initialDriveState: DriveState = { speed: 0, distance: 0, heading: 0, nitro: 64, drift: 0, lap: 1, checkpoint: 0 };

export function stepVehicle(state: DriveState, input: DriveInput, car: CarProfile, dt: number): DriveState {
  const boost = input.nitro && state.nitro > 0 ? 1.72 : 1;
  const gearLimit = input.throttle === 0 ? state.speed : car.topSpeed;
  const acceleration = car.acceleration * 9.5 * input.throttle * boost;
  const braking = car.braking * 12 * input.brake;
  const handbrakeLoss = input.handbrake ? 15 : 0;
  const drag = input.throttle || input.brake ? 2.8 : 8;
  const speed = Math.max(0, Math.min(gearLimit, state.speed + (acceleration - braking - drag - handbrakeLoss) * dt));
  const lateral = Math.abs(input.steering) * (speed / Math.max(car.topSpeed, 1));
  const drift = Math.max(0, Math.min(100, state.drift + (lateral * (input.handbrake ? 130 : 55) - 18) * dt));
  const turnRate = (0.42 + speed / Math.max(car.topSpeed, 1)) * car.handling * input.steering * (input.handbrake ? 1.45 : 1);
  const nitro = input.nitro && speed > 1 ? Math.max(0, state.nitro - 31 * dt) : Math.min(100, state.nitro + 7 * dt);
  const distance = state.distance + speed * dt;
  const checkpoint = (state.checkpoint + speed * dt) % 1000;
  const lap = Math.min(3, 1 + Math.floor((state.distance + speed * dt) / 1000));
  return { speed, nitro, drift, distance, checkpoint, lap, heading: state.heading + turnRate * dt };
}
