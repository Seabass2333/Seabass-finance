import { format } from 'date-fns'

import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  LineChart,
  Line,
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

export const LineVariant = ({ data }: Data) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={350}
    >
      <LineChart data={data}>
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
        <Line
          dot={false}
          dataKey='income'
          stroke='#3d82f6'
          strokeWidth={2}
          className='drop-shadow-sm'
        />
        <Line
          dot={false}
          dataKey='expenses'
          stroke='#f43f5e'
          strokeWidth={2}
          className='drop-shadow-sm'
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
