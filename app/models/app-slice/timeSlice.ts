import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TimerState {
  timerTop: {
    isActive: boolean;
    time: number;
  };
  timerBot: {
    isActive: boolean;
    time: number;
  };
}

const initialState: TimerState = {
  timerTop: {
    isActive: false,
    time: 600,
  },
  timerBot: {
    isActive: false,
    time: 600,
  },
};

export const timeSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.timerTop.isActive = false;
      state.timerBot.isActive = false;
    },
    switchState: (state) => {
      state.timerTop.isActive = !state.timerTop.isActive;
      state.timerBot.isActive = !state.timerBot.isActive;
    },
    changeState: (state, action: PayloadAction<keyof TimerState>) => {
      state[action.payload].isActive = !state[action.payload].isActive;
    },
    changeTime: (state, action: PayloadAction<number>) => {
      state.timerTop.time = action.payload;
      state.timerBot.time = action.payload;
    },
    incrementTime: (
      state,
      action: PayloadAction<{ increment: number; timer: keyof TimerState }>
    ) => {
      state[action.payload.timer].time += action.payload.increment;
    },
    decrementTime: (state, action: PayloadAction<keyof TimerState>) => {
      if (state[action.payload].isActive && state[action.payload].time > 0)
        state[action.payload].time -= 1;
    },
  },
});

export const {
  changeState,
  changeTime,
  incrementTime,
  decrementTime,
  switchState,
  resetState,
} = timeSlice.actions;

export default timeSlice.reducer;
