"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

interface MonthSelectorProps {
  selectedMonth: number
  onMonthChange: (month: number) => void
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  const handlePrevious = () => {
    onMonthChange(selectedMonth === 0 ? 11 : selectedMonth - 1)
  }

  const handleNext = () => {
    onMonthChange(selectedMonth === 11 ? 0 : selectedMonth + 1)
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handlePrevious}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Select value={selectedMonth.toString()} onValueChange={(value) => onMonthChange(Number.parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((month, index) => (
            <SelectItem key={month} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon" onClick={handleNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
