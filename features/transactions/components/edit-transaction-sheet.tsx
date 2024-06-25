import { z } from 'zod'

import { insertTransactionSchema } from '@/db/schema'
import { useGetTransaction } from '@/features/transactions/api/use-get-transaction'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { useUpdateTransaction } from '@/features/transactions/api/use-update-transaction'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import { TransactionForm } from './transaction-form'
import { Loader2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertTransactionSchema.omit({
  id: true
})

type FormValues = z.input<typeof formSchema>

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id = '' } = useOpenTransaction()

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You want to delete this transaction? This action cannot be undone.'
  )

  const transactionQuery = useGetTransaction(id)
  const editMutation = useUpdateTransaction(id)
  const deleteMutation = useDeleteTransaction(id)

  const isLoading = transactionQuery.isLoading
  const isPending = editMutation.isPending || deleteMutation.isPending

  const handleSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const onDelete = async () => {
    const ok = await confirm()
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  const defaultValues = transactionQuery.data
    ? {
        name: transactionQuery.data.name
      }
    : {
        name: ''
      }

  return (
    <>
      <ConfirmDialog />
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-4 text-muted-foreground animate-spin' />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={handleSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
