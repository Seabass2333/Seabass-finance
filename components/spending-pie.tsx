import { useState } from 'react'
import { FileSearch, PieChart, Radar, Target } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem
} from '@/components/ui/select'
import { AreaVariant } from '@/components/area-variant'
import { BarVariant } from '@/components/bar-variant'
import { LineVariant } from '@/components/line-variant'

type Props = {
  data: {
    date: string
    income: number
    expenses: number
  }[]
}
export const SpendingPie = ({ data }: Props) => {
  const [chartType, setChartType] = useState('pie')

  const handleChartTypeChange = (type: string) => {
    // TODO: add paywall
    setChartType(type)
  }

  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
        <CardTitle className='text-xl line-clamp-1'>Categories</CardTitle>
        <Select
          defaultValue={chartType}
          onValueChange={handleChartTypeChange}
        >
          <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
            <SelectValue placeholder='Chart type' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='pie'>
              <div className='flex items-center'>
                <PieChart className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Pie chart</p>
              </div>
            </SelectItem>
            <SelectItem value='radar'>
              <div className='flex items-center'>
                <Radar className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Radar chart</p>
              </div>
            </SelectItem>
            <SelectItem value='target'>
              <div className='flex items-center'>
                <Target className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Target chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
            <FileSearch className='size-6 text-muted-foreground' />
            <p className='text-muted-foreground text-sm'>
              No data available for the selected period
            </p>
          </div>
        ) : (
          <>
            {chartType === 'pie' && <PieChart data={data} />}
            {chartType === 'radar' && <Radar data={data} />}
            {chartType === 'target' && <Target data={data} />}
          </>
        )}
        <div className='h-96'>
          <div
            className='h-full w-full'
            id='chart'
          ></div>
        </div>
      </CardContent>
    </Card>
  )
}
