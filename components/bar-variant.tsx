import { format } from 'date-fns'

import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts'
import { CustomTooltip } from '@/components/custom-tooltip'

type Data = {
  data: {
    date: string
    income: number
    expenses: number
  }[]
}

export const BarVariant = ({ data }: Data) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={350}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='date'
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => format(value, 'MMM dd')}
          style={{ fontSize: '12px' }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey='income'
          fill='#3d82f6'
          className='drop-shadow-sm'
        />
        <Bar
          dataKey='expenses'
          fill='#f43f5e'
          className='drop-shadow-sm'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
