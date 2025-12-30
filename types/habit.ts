export interface Habit {
  id: string
  name: string
  isSleep: boolean
  completedDays: {
    [month: number]: {
      [day: number]: boolean
    }
  }
}

export interface MonthData {
  totalPossible: number
  totalCompleted: number
  completionPercentage: number
  dailyPerformance: Record<number, number>
  sleepHours: Record<number, number>
}
