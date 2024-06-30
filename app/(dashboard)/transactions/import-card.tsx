import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ImportTable from './import-table'

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

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Import Transactions
          </CardTitle>
          <div className='flex items-center gap-x-2'>
            <Button
              size='sm'
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={progress < requiredOptions.length}
              onClick={() => {}}
            >
              Continue ({progress} / {requiredOptions.length})
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
