'use client'

import { Button } from '@/components/ui/button'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'

const Home = () => {
  const { onOpen } = useNewAccount()
  return <Button onClick={onOpen}>Dashboard Page</Button>
}

export default Home
