import { VariantProps, cva } from 'class-variance-authority'
import { IconType } from 'react-icons'

import { cn, formatCurrency, formatPercentage } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CountUp } from '@/components/count-up'
import { Skeleton } from '@/components/ui/skeleton'

const boxVariant = cva('shrink-0 rounded-md p-3', {
  variants: {
    variant: {
      default: 'bg-blue-500/20',
      success: 'bg-emerald-500/20',
      danger: 'bg-rose-500/20',
      warning: 'bg-yellow-500/20'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})
const iconVariant = cva('size-6', {
  variants: {
    variant: {
      default: 'fill-blue-500',
      success: 'fill-emerald-500',
      danger: 'fill-rose-500',
      warning: 'fill-yellow-500'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

type BoxVariant = VariantProps<typeof boxVariant>
type IconVariant = VariantProps<typeof iconVariant>

interface DataCardProps extends BoxVariant, IconVariant {
  icon: IconType
  title: string
  value?: number
  percentageChange: number
  dataRange: string
}

export const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  dataRange,
  percentageChange,
  variant = 'default'
}: DataCardProps) => {
  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
        <div className='space-y-2'>
          <CardTitle className='text-2xl line-clamp-1'>{title}</CardTitle>
          <CardDescription className='line-clamp-1'>
            {dataRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className='font-bold text-2xl mb-2 line-clamp-1 break-all'>
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={cn(
            'text-muted-foreground text-sm line-clamp-1',
            percentageChange > 0 && 'text-emerald-500',
            percentageChange < 0 && 'text-rose-500'
          )}
        >
          {formatPercentage(percentageChange, {
            addPrefix: true
          })}{' '}
          from last period
        </p>
      </CardContent>
    </Card>
  )
}

export const DataCardLoading = () => {
  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
        <div className='space-y-2'>
          <Skeleton className='w-24 h-6' />
          <Skeleton className='w-40 h-4' />
        </div>
        <Skeleton className='size-12' />
      </CardHeader>
      <CardContent>
        <Skeleton className='shrink-0 w-24 h-10 mb-2' />
        <Skeleton className='shrink-0 w-40 h-4' />
      </CardContent>
    </Card>
  )
}
