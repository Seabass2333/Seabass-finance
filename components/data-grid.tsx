'use client'

import { useSearchParams } from 'next/navigation'

import { useGetSummary } from '@/features/summary/api/use-get-summary'
import { formatDateRange } from '@/lib/utils'
import { FaPiggyBank } from 'react-icons/fa'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'
import { DataCard, DataCardLoading } from './data-card'

const DataGrid = () => {
  const { data, isLoading } = useGetSummary()

  const params = useSearchParams()
  const from = params.get('from') || ''
  const to = params.get('to') || ''

  const dataRangeLabel = formatDateRange({ from, to })

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
      <DataCard
        title='Remaining'
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant='danger'
        dataRange={dataRangeLabel}
      />
      <DataCard
        title='Income'
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        dataRange={dataRangeLabel}
      />
      <DataCard
        title='Expenses'
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        dataRange={dataRangeLabel}
      />
    </div>
  )
}

export default DataGrid
