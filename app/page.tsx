"use client"

import { useState } from "react"
import { HabitTracker } from "@/components/habit-tracker"
import { PerformanceCharts } from "@/components/performance-charts"
import { MonthlyStats } from "@/components/monthly-stats"
import { MonthSelector } from "@/components/month-selector"
import { useHabits } from "@/hooks/use-habits"

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState(0) // 0 = January
  const { habits, addHabit, toggleHabit, getMonthData } = useHabits()

  const monthData = getMonthData(selectedMonth)

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Higema</h1>
            <p className="text-muted-foreground text-sm">Track your habits and boost productivity</p>
          </div>
          <MonthSelector selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
        </div>

        {/* Monthly Stats */}
        <MonthlyStats data={monthData} month={selectedMonth} />

        {/* Habit Tracker Table */}
        <HabitTracker habits={habits} selectedMonth={selectedMonth} onAddHabit={addHabit} onToggleHabit={toggleHabit} />

        {/* Performance Charts */}
        <PerformanceCharts data={monthData} month={selectedMonth} />
      </div>
    </main>
  )
}
