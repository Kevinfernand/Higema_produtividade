"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Calendar } from "lucide-react"
import type { MonthData } from "@/types/habit"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

interface MonthlyStatsProps {
  data: MonthData
  month: number
}

export function MonthlyStats({ data, month }: MonthlyStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
              <p className="text-3xl font-bold">{data.totalPossible}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold">{data.totalCompleted}</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Target className="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{MONTHS[month]} Performance</p>
              <p className="text-3xl font-bold">{data.completionPercentage.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-chart-3/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-chart-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
