'use client'

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
import { useState } from 'react'

interface ConfirmDialogProps {
  children?: React.ReactNode
}

export const useConfirm = (
  title: string,
  message: string
): [React.FC<ConfirmDialogProps>, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve })
    })
  }

  const handleClose = () => {
    console.log('handleClose')

    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    console.log('handleCancel')

    promise?.resolve(false)
    handleClose()
  }

  const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ children }) => {
    return (
      <Dialog open={promise !== null}>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{message}</DialogDescription>
            </DialogHeader>
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
