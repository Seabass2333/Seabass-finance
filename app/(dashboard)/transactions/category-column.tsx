import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'

import { cn } from '@/lib/utils'
import { TriangleAlert } from 'lucide-react'

type Props = {
  id: string
  category: string | null
  categoryId: string | null
}

const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen: onOpenCategory } = useOpenCategory()
  const { onOpen: onOpenTransaction } = useOpenTransaction()

  const onClick = () => {
    if (categoryId) onOpenCategory(categoryId)
    else onOpenTransaction(id)
  }

  return (
    <div
      className='flex items-center space-x-2 cursor-pointer hover:underline'
      onClick={onClick}
    >
      {!category && (
        <TriangleAlert
          className={cn('mr-2 size-4 shrink-0', !category && 'text-rose-500')}
        />
      )}
      {category || 'Uncategorized'}
    </div>
  )
}

export default CategoryColumn
