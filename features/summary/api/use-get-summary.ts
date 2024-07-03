import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { client } from '@/lib/hono'
import { convertAmountFromMilicent } from '@/lib/utils'

export const useGetSummary = () => {
  const params = useSearchParams()
  const from = params.get('from') || ''
  const to = params.get('to') || ''
  const accountId = params.get('accountId') || ''

  const query = useQuery({
    queryKey: ['summary', { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch summary')
      }

      const responseData = await response.json()
      if ('error' in responseData) {
        throw new Error(responseData.error)
      }

      const { data } = responseData

      return {
        ...data,
        incomeAmount: convertAmountFromMilicent(data.incomeAmount),
        expensesAmount: convertAmountFromMilicent(data.expensesAmount),
        remainingAmount: convertAmountFromMilicent(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMilicent(category.value)
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMilicent(day.income),
          expenses: convertAmountFromMilicent(day.expenses)
        }))
      }
    }
  })
  return query
}

