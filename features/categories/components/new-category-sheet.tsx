import { z } from 'zod'

import { insertCategorySchema } from '@/db/schema'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useCreateCategory } from '@/features/categories/api/use-create-category'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import { CategoryForm } from './category-form'

const formSchema = insertCategorySchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory()

  const mutation = useCreateCategory()

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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to get started.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={handleSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: ''
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
