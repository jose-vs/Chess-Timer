export type TimerType = "top" | "bot";
export type TimerStatus = "paused" | "live" | "ready";

export interface ITimerInterface {
  name: string;
  key: string;
  status: TimerStatus;
  increment: number;
  startTime: number;
}

export interface ITimer {
  name: TimerType;
  isActive: boolean
  time: number
}


export interface TimerState {
  top: ITimer;
  bot: ITimer;
}