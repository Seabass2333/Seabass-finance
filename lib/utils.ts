import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMilicent(amount: number) {
  return amount / 1000
}

export function convertAmountToMilicent(amount: number) {
  return Math.round(amount * 1000)
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export const calculatePercentageChange = (current: number, last: number) => {
  if (last === 0) {
    return current === 0 ? 0 : 100
  }

  return ((current - last) / last) * 100
}

export function fillMissingDays(activeDays: {
  date: Date,
  income: number,
  expenses: number,
}[], startDate: Date, endDate: Date) {
  if (activeDays.length === 0) {
    return []
  }

  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  return allDays.map((date) => {
    const activeDay = activeDays.find((day) => isSameDay(day.date, date))

    if (activeDay) {
      return activeDay
    } else {
      return {
        date,
        income: 0,
        expenses: 0,
      }
    }
  })
}

type Period = {
  from: string | Date | undefined
  to: string | Date | undefined
}
export function formatDateRange(period: Period) {
  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  if (!period?.from) {
    return `${format(defaultFrom, 'LLL dd')} - ${format(defaultTo, 'LLL dd, y')}`
  }
  if (!period?.to) {
    return `${format(period.from, 'LLL dd')} - ${format(defaultTo, 'LLL dd, y')}`
  }

  return format(period.from, 'LLL dd, y')
}

export function formatPercentage(value: number, options: {
  addPrefix?: boolean
} = {
    addPrefix: false
  }) {
  const result = new Intl.NumberFormat('en-US', {
    style: 'percent',
  }).format(value / 100)

  if (options.addPrefix && value > 0) {
    return `+${result}`
  }

  return result
}

