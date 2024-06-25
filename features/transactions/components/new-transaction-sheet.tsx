import { z } from 'zod'

import { insertTransactionSchema } from '@/db/schema'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { useCreateTransaction } from '@/features/transactions/api/use-create-transaction'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import { TransactionForm } from './transaction-form'

const formSchema = insertTransactionSchema.omit({
  id: true
})

type FormValues = z.input<typeof formSchema>

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction()

  const mutation = useCreateTransaction()

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
    >
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Create a new transaction.</SheetDescription>
        </SheetHeader>
        <p>TODO: Transactions form</p>
      </SheetContent>
    </Sheet>
  )
}
