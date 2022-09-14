import { ITimerInterface } from "./types";
export const DEFAULT_TIMER = {
  name: "default",
  status: "ready",
  startTime: 600,
  increment: 0,
} as ITimerInterface;

export const DEFAULT_TIMER_MODES: ITimerInterface[] = [
  {
    name: "1 min",
    key: "@1 min_key",
    status: "ready",
    startTime: 60,
    increment: 0,
  },
  {
    name: "3 min",
    key: "@3 min_key",
    status: "ready",
    startTime: 180,
    increment: 0,
  },
  {
    name: "5 min",
    key: "@5 min_key",
    status: "ready",
    startTime: 300,
    increment: 0,
  },
  {
    name: "10 min",
    key: "@10 min_key",
    status: "ready",
    startTime: 600,
    increment: 0,
  },
  {
    name: "30 min",
    key: "@30 min_key",
    status: "ready",
    startTime: 1800,
    increment: 0,
  },
  {
    name: "3|2",
    key: "@3|2_key",
    status: "ready",
    startTime: 180,
    increment: 2,
  },

  {
    name: "5|5",
    key: "@5|5_key",
    status: "ready",
    startTime: 300,
    increment: 5,
  },
];
