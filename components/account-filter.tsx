'use client'

import qs from 'query-string'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useGetSummary } from '@/features/summary/api/use-get-summary'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const AccountFilter = () => {
  const router = useRouter()
  const pathname = usePathname()

  const params = useSearchParams()
  const accountId = params.get('accountId') || 'all'
  const from = params.get('from') || ''
  const to = params.get('to') || ''

  const { isLoading: isLoadingSummary } = useGetSummary()
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()

  const onChange = (value: string) => {
    const query = {
      accountId: value,
      from,
      to
    }

    if (value === 'all') {
      query.accountId = ''
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query
      },
      { skipNull: true, skipEmptyString: true }
    )

    router.push(url)
  }

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className='lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition'>
        <SelectValue placeholder='Account' />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value='all'>Select Accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem
            key={account.id}
            value={account.id}
          >
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default AccountFilter
