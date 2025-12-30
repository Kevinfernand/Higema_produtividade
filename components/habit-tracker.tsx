"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"
import type { Habit } from "@/types/habit"

interface HabitTrackerProps {
  habits: Habit[]
  selectedMonth: number
  onAddHabit: (name: string, isSleep: boolean) => void
  onToggleHabit: (habitId: string, month: number, day: number) => void
}

export function HabitTracker({ habits, selectedMonth, onAddHabit, onToggleHabit }: HabitTrackerProps) {
  const [newHabitName, setNewHabitName] = useState("")
  const [isSleepRelated, setIsSleepRelated] = useState(false)

  const daysInMonth = new Date(2025, selectedMonth + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      onAddHabit(newHabitName, isSleepRelated)
      setNewHabitName("")
      setIsSleepRelated(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Habit Form */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Nova tarefa (ex: comer fruta, estudar, treinar)"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                id="sleep-related"
                checked={isSleepRelated}
                onCheckedChange={(checked) => setIsSleepRelated(checked === true)}
              />
              <label htmlFor="sleep-related" className="text-sm text-muted-foreground cursor-pointer">
                Sleep-related habit
              </label>
            </div>
          </div>
          <Button onClick={handleAddHabit}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Habit Table */}
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid gap-1" style={{ gridTemplateColumns: `200px repeat(${daysInMonth}, 32px)` }}>
              {/* Header */}
              <div className="sticky left-0 bg-card font-semibold text-sm p-2 border-b border-border">Task</div>
              {days.map((day) => (
                <div key={day} className="text-center text-xs p-2 border-b border-border text-muted-foreground">
                  {day}
                </div>
              ))}

              {/* Habit Rows */}
              {habits.map((habit) => (
                <div key={habit.id} className="contents">
                  <div className="sticky left-0 bg-card p-2 border-b border-border text-sm flex items-center gap-2">
                    <span>{habit.name}</span>
                    {habit.isSleep && (
                      <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">Sleep</span>
                    )}
                  </div>
                  {days.map((day) => {
                    const isChecked = habit.completedDays[selectedMonth]?.[day] || false
                    return (
                      <div key={day} className="flex items-center justify-center border-b border-border p-1">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => onToggleHabit(habit.id, selectedMonth, day)}
                          className="h-5 w-5"
                        />
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {habits.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No habits yet. Add your first habit above!</div>
        )}
      </CardContent>
    </Card>
  )
}
