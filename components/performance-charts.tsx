"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import type { MonthData } from "@/types/habit"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

interface PerformanceChartsProps {
  data: MonthData
  month: number
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function PerformanceCharts({ data, month }: PerformanceChartsProps) {
  const daysInMonth = new Date(2025, month + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Daily Performance Chart Data
  const dailyPerformanceData = {
    labels: days.map((d) => `${d}`),
    datasets: [
      {
        label: "Daily Performance",
        data: days.map((day) => data.dailyPerformance[day] || 0),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Sleep Hours Chart Data
  const sleepHoursData = {
    labels: days.map((d) => `${d}`),
    datasets: [
      {
        label: "Sleep Score",
        data: days.map((day) => data.sleepHours[day] || 0),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Monthly Performance Bar Chart (all 12 months)
  const monthlyData = {
    labels: MONTHS,
    datasets: [
      {
        label: "Monthly Completion %",
        data: MONTHS.map((_, idx) => {
          // You'd calculate this from actual data in a real implementation
          return idx === month ? data.completionPercentage : 0
        }),
        backgroundColor: "rgb(99, 102, 241)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Daily Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <Line data={dailyPerformanceData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Sleep Hours Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sleep Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <Line data={sleepHoursData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Monthly Performance Chart */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-base">Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <Bar data={monthlyData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
