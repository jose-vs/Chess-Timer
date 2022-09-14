
export type TimerType = 'top' | 'bot'
export type TimerStatus = 'ready' | 'live'

export interface ITimerInterface { 
    name: string
    key: string
    status: TimerStatus
    increment: number
    startTime: number 
}

export interface ITimer { 
    name: TimerType
    isActive: boolean
    remainingTime: number
}