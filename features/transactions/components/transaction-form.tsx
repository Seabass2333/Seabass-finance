import { z } from 'zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { insertTransactionSchema } from '@/db/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional()
})

const apiSchema = insertTransactionSchema.omit({
  id: true
})

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.output<typeof apiSchema>

type Props = {
  id?: string
  disabled?: boolean
  defaultValues?: FormValues
  onDelete?: () => void
  onSubmit: (values: ApiFormValues) => void
  accountOptions: { value: string; label: string }[]
  categoryOptions: { value: string; label: string }[]
  onCreateCategory: (name: string) => void
  onCreateAccount: (name: string) => void
}

export const TransactionForm = ({
  id,
  disabled,
  defaultValues,
  onDelete,
  onSubmit,
  accountOptions,
  categoryOptions,
  onCreateCategory,
  onCreateAccount
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const handleSubmit = (data: FormValues) => {
    onSubmit(data)
  }

  const handleDelete = () => {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-4'
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='e.g. Cash, Bank, Credit Card'
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          className='w-full'
          disabled={disabled}
        >
          {id ? 'save changes' : 'create transaction'}
        </Button>
        {!!id && (
          <Button
            type='button'
            disabled={disabled}
            onClick={handleDelete}
            className='w-full'
            variant='outline'
          >
            <Trash className='size-4 mr-2' />
            Delete transaction
          </Button>
        )}
      </form>
    </Form>
  )
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const handleSubmit = (data: FormValues) => {
    onSubmit(data)
  }

  const handleDelete = () => {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-4'
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='e.g. Cash, Bank, Credit Card'
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          className='w-full'
          disabled={disabled}
        >
          {id ? 'save changes' : 'create transaction'}
        </Button>
        {!!id && (
          <Button
            type='button'
            disabled={disabled}
            onClick={handleDelete}
            className='w-full'
            variant='outline'
          >
            <Trash className='size-4 mr-2' />
            Delete transaction
          </Button>
        )}
      </form>
    </Form>
  )
}
