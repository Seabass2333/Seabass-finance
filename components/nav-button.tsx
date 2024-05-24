import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  href: string
  label: string
  isActive: boolean
}

const NavButton = ({ href, label, isActive }: Props) => {
  return (
    <Button
      asChild
      size='sm'
      variant='outline'
      className=''
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export default NavButton
