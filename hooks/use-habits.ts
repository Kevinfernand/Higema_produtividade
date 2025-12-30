"use client"

import { useState, useCallback } from "react"
import type { Habit, MonthData } from "@/types/habit"

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Eat Fruit",
      isSleep: false,
      completedDays: {},
    },
    {
      id: "2",
      name: "Study",
      isSleep: false,
      completedDays: {},
    },
    {
      id: "3",
      name: "Exercise",
      isSleep: false,
      completedDays: {},
    },
    {
      id: "4",
      name: "Sleep 8 hours",
      isSleep: true,
      completedDays: {},
    },
  ])

  const addHabit = useCallback((name: string, isSleep: boolean) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      isSleep,
      completedDays: {},
    }
    setHabits((prev) => [...prev, newHabit])
  }, [])

  const toggleHabit = useCallback((habitId: string, month: number, day: number) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === habitId) {
          const monthData = habit.completedDays[month] || {}
          const newMonthData = {
            ...monthData,
            [day]: !monthData[day],
          }
          return {
            ...habit,
            completedDays: {
              ...habit.completedDays,
              [month]: newMonthData,
            },
          }
        }
        return habit
      }),
    )
  }, [])

  const getMonthData = useCallback(
    (month: number): MonthData => {
      const daysInMonth = new Date(2025, month + 1, 0).getDate()

      // Calculate totals
      const totalPossible = habits.length * daysInMonth
      let totalCompleted = 0
      const dailyPerformance: Record<number, number> = {}
      const sleepHours: Record<number, number> = {}

      // Calculate daily performance and sleep
      for (let day = 1; day <= daysInMonth; day++) {
        let dayCompleted = 0
        let daySleep = 0

        habits.forEach((habit) => {
          const isCompleted = habit.completedDays[month]?.[day] || false
          if (isCompleted) {
            dayCompleted++
            totalCompleted++
            if (habit.isSleep) {
              daySleep++
            }
          }
        })

        dailyPerformance[day] = dayCompleted
        sleepHours[day] = daySleep
      }

      const completionPercentage = totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0

      return {
        totalPossible,
        totalCompleted,
        completionPercentage,
        dailyPerformance,
        sleepHours,
      }
    },
    [habits],
  )

  return {
    habits,
    addHabit,
    toggleHabit,
    getMonthData,
  }
}
