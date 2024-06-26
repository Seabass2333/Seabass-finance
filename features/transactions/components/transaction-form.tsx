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
import Select from '@/components/select'
import { DatePicker } from '@/components/date-picker'
import { Textarea } from '@/components/ui/textarea'
import { AmountInput } from '@/components/amount-input'
import { convertAmountToMilicent } from '@/lib/utils'

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
    const amount = parseFloat(data.amount)
    const amountInMilicent = convertAmountToMilicent(amount)
    onSubmit({ ...data, amount: amountInMilicent })
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
          name='date'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='accountId'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  placeholder='Select an account'
                  options={accountOptions}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  onCreate={onCreateAccount}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='categoryId'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Select
                  placeholder='Select an category'
                  options={categoryOptions}
                  value={field.value}
                  onChange={field.onChange}
                  onCreate={onCreateCategory}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='payee'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder='Enter a payee'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='amount'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  disabled={disabled}
                  placeholder='0.00'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='notes'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={disabled}
                  value={field.value ?? ''}
                  placeholder='Optional Notes'
                />
              </FormControl>
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
