import { ITimerInterface } from "./types";
import 'react-native-get-random-values';
import { v4 as uuidv4  } from 'uuid';


export const DEFAULT_TIMER_MODES: ITimerInterface[] = [
  {
    name: "1 min",
    key: uuidv4(),
    status: "ready",
    startTime: 60,
    increment: 0,
    selected: false
  },
  {
    name: "3 min",
    key: uuidv4(),
    status: "ready",
    startTime: 180,
    increment: 0,
    selected: false
  },
  {
    name: "5 min",
    key: uuidv4(),
    status: "ready",
    startTime: 300,
    increment: 0,
    selected: false
  },
  {
    name: "10 min",
    key: uuidv4(),
    status: "ready",
    startTime: 600,
    increment: 0,
    selected: false
  },
  {
    name: "30 min",
    key: uuidv4(),
    status: "ready",
    startTime: 1800,
    increment: 0,
    selected: false
  },
  {
    name: "3|2",
    key: uuidv4(),
    status: "ready",
    startTime: 180,
    increment: 2,
    selected: false
  },

  {
    name: "5|5",
    key: uuidv4(),
    status: "ready",
    startTime: 300,
    increment: 5,
    selected: false
  },
];
