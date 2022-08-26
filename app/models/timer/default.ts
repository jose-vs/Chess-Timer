import { ITimerInterface } from "./types";
export const DEFAULT_TIMER = {
  name: "default",
  status: "ready",
  startTime: 600,
  updateInterval: 100,
  increment: 0,
} as ITimerInterface;
