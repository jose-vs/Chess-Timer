import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITimerInterface, TimerStatus } from "../timer";

const initialState: ITimerInterface = {
  name: "default",
  key: "@default_key",
  status: "ready",
  increment: 0,
  startTime: 600,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<ITimerInterface>) => {
      state.name = action.payload.name;
      state.key = action.payload.key
      state.status = "ready";
      state.increment = action.payload.increment;
      state.startTime = action.payload.startTime;
    },
    changeStatus: (state, action: PayloadAction<TimerStatus>) => { 
      state.status = action.payload
    },
  },
});

export const { changeMode, changeStatus } = modeSlice.actions;

export default modeSlice.reducer;
