'use client'

import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account'

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
    'You want to delete this account? This action cannot be undone.'
  )

  const { onOpen } = useOpenAccount()
  const deleteMutation = useDeleteAccount(id)

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
