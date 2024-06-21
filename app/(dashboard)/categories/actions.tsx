'use client'

import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'

import { useConfirm } from '@/hooks/use-confirm'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Props = {
  id: string
}
const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You want to delete this category? This action cannot be undone.'
  )

  const { onOpen } = useOpenCategory()
  const deleteMutation = useDeleteCategory(id)

  const handleDelete = async () => {
    const ok = await confirm()
    if (ok) {
      deleteMutation.mutate()
    }
  }

  return (
    <>
      <ConfirmDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='size-8 p-0'
            >
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              disabled={deleteMutation.isPending}
              onClick={() => onOpen(id)}
            >
              <Edit className='size-4 mr-2' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={deleteMutation.isPending}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleDelete()
              }}
            >
              <Trash className='size-4 mr-2' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ConfirmDialog>
    </>
  )
}

export default Actions
