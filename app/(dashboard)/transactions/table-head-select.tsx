import { cn } from '@/lib/utils'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type Props = {
  columnIndex: number
  selectedColumns: Record<string, string | null>
  onChange: (columnIndex: number, value: string | null) => void
}

const options = ['amount', 'date', 'payee', 'notes']

const TableHeadSelect = ({ columnIndex, selectedColumns, onChange }: Props) => {
  const currentSelected = selectedColumns[`column_${columnIndex}`] || ''

  return (
    <Select
      value={currentSelected || ''}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          'focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize',
          currentSelected && 'text-blue-500'
        )}
      >
        <SelectValue placeholder='Skip' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='skip'>Skip</SelectItem>
        {options.map((option) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            option !== currentSelected
          return (
            <SelectItem
              key={option}
              value={option}
              disabled={disabled}
              className='capitalize'
            >
              {option}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
export default TableHeadSelect
