import { useState } from 'react'

import { format, parse } from 'date-fns'
import { convertAmountToMilicent } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import ImportTable from './import-table'
import { on } from 'events'

const dateFormat = 'yyyy-MM-dd HH:mm:ss'
const outputDateFormat = 'yyyy-MM-dd'

const requiredOptions = ['amount', 'date', 'payee']

interface SelectedColumnsState {
  [key: string]: string | null
}

type Props = {
  data: string[]
  onCancel: () => void
  onSubmit: (data: string[]) => void
}
export const ImportCard: React.FC<Props> = ({ data, onCancel, onSubmit }) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  )

  const headers: any = data[0]
  const body: any = data.slice(1)

  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const onTableHeaderSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev }

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null
        }
      }
      if (value === 'skip') {
        value = null
      }

      newSelectedColumns[`column_${columnIndex}`] = value
      return newSelectedColumns
    })
  }

  const progress = () => Object.values(selectedColumns).filter(Boolean).length

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1]
    }
    const mappedData = {
      headers: headers.map((header: string, index: number) => {
        const columnIndex = getColumnIndex(`column_${index}`)
        return selectedColumns[`column_${columnIndex}`] || null
      }),
      body: body
        .map((row: string[]) => {
          const transformRow = row.map((cell: string, index: number) => {
            const columnIndex = getColumnIndex(`column_${index}`)
            return selectedColumns[`column_${columnIndex}`] ? cell : null
          })

          return transformRow.every((cell: string | null) => cell === null)
            ? []
            : transformRow
        })
        .filter((row: string[]) => row.length > 0)
    }

    const arrayOfData = mappedData.body.map((row: string[]) => {
      return row.reduce(
        (acc: Record<string, string>, cell: string, index: number) => {
          const header = mappedData.headers[index]
          if (header !== null) {
            acc[header] = cell
          }
          return acc
        },
        {}
      )
    })

    const formattedData = arrayOfData.map((row: Record<string, string>) => {
      return {
        ...row,
        amount: convertAmountToMilicent(parseFloat(row.amount)),
        date: format(parse(row.date, dateFormat, new Date()), outputDateFormat)
      }
    })

    onSubmit(formattedData)
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Import Transactions
          </CardTitle>
          <div className='flex flex-col lg:flex-row gap-y-2 items-center gap-x-2'>
            <Button
              size='sm'
              onClick={onCancel}
              className='w-full lg:w-auto'
            >
              Cancel
            </Button>
            <Button
              size='sm'
              disabled={progress() < requiredOptions.length}
              onClick={handleContinue}
              className='w-full lg:w-auto bg-blue-500 hover:bg-blue-600 text-white'
            >
              Continue ({String(progress())} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeaderSelectChange={onTableHeaderSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}
