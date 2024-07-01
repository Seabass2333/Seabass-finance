'use client'

import { useRef, useState } from 'react'
import { useGetAccounts } from '../api/use-get-accounts'
import { useCreateAccount } from '../api/use-create-account'

import Select from '@/components/select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle
} from '@/components/ui/dialog'

interface ConfirmDialogProps {
  children?: React.ReactNode
}

export const useSelectAccount = (): [
  React.FC<ConfirmDialogProps>,
  () => Promise<unknown>
] => {
  const accountQuery = useGetAccounts()
  const accountMutation = useCreateAccount()
  const onCreateAccount = (name: string) => accountMutation.mutate({ name })
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    value: account.id,
    label: account.name
  }))

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void
  } | null>(null)
  const selectValue = useRef<string>()

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve })
    })
  }

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(selectValue.current)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(undefined)
    handleClose()
  }

  const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ children }) => {
    return (
      <Dialog open={promise !== null}>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Account</DialogTitle>
              <DialogDescription>
                Please select an account to continue
              </DialogDescription>
            </DialogHeader>
            <Select
              placeholder='Select an account'
              options={accountOptions}
              onCreate={onCreateAccount}
              onChange={(value) => (selectValue.current = value)}
              disabled={accountQuery.isLoading || accountMutation.isPending}
            />
            <DialogFooter className='pt-2'>
              <Button
                onClick={handleCancel}
                variant='outline'
              >
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
        {children}
      </Dialog>
    )
  }

  return [ConfirmDialog, confirm]
}
