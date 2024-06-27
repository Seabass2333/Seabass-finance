import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

import { cn } from '@/lib/utils'

type Props = {
  account: string
  accountId: string
}

const AccountColumn = ({ account, accountId }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount()

  const onClick = () => {
    onOpenAccount(accountId)
  }

  return (
    <div
      className='flex items-center space-x-2 cursor-pointer hover:underline text-sm text-gray-500 hover:text-gray-700'
      onClick={onClick}
    >
      <span>{account}</span>
    </div>
  )
}

export default AccountColumn
