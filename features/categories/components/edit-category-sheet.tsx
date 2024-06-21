import { z } from 'zod'

import { insertCategorySchema } from '@/db/schema'
import { useGetCategory } from '@/features/categories/api/use-get-category'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { useUpdateCategory } from '@/features/categories/api/use-update-category'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import { CategoryForm } from './category-form'
import { Loader2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertCategorySchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export const EditCategorySheet = () => {
  const { isOpen, onClose, id = '' } = useOpenCategory()

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You want to delete this category This action cannot be undone.'
    // () => deleteMutation.mutate()
  )

  const categoryQuery = useGetCategory(id)
  const editMutation = useUpdateCategory(id)
  const deleteMutation = useDeleteCategory(id)

  const isLoading = categoryQuery.isLoading
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

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-4 text-muted-foreground animate-spin' />
            </div>
          ) : (
            <CategoryForm
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
