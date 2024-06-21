import { z } from 'zod'

import { insertAccountSchema } from '@/db/schema'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useUpdateAccount } from '@/features/accounts/api/use-update-account'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import { AccountForm } from './account-form'
import { Loader2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertAccountSchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export const EditAccountSheet = () => {
  const { isOpen, onClose, id = '' } = useOpenAccount()

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You want to delete this account? This action cannot be undone.'
    // () => deleteMutation.mutate()
  )

  const accountQuery = useGetAccount(id)
  const editMutation = useUpdateAccount(id)
  const deleteMutation = useDeleteAccount(id)

  const isLoading = accountQuery.isLoading
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

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-4 text-muted-foreground animate-spin' />
            </div>
          ) : (
            <AccountForm
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
