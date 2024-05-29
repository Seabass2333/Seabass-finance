'use client'

import { useState } from 'react'
import { useMedia } from 'react-use'
import { usePathname, useRouter } from 'next/navigation'

import NavButton from '@/components/nav-button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const routes = [
  {
    path: '/',
    component: 'Overview'
  },
  {
    path: '/transactions',
    component: 'Transactions'
  },
  {
    path: '/accounts',
    component: 'Accounts'
  },
  {
    path: '/categories',
    component: 'Categories'
  },
  {
    path: '/settings',
    component: 'Settings'
  }
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMedia('(max-width: 1023px)', true)

  const onClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  if (isMobile) {
    return (
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SheetTrigger className='font-normal text-white p-3 rounded-sm bg-white/10 hover:bg-white/20 focus:bg-white/30 transition'>
          <Menu className='size-4' />
        </SheetTrigger>
        <SheetContent
          side='left'
          className='px-2'
        >
          <nav className='flex flex-col gap-y-2 pt-6'>
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={route.path === pathname ? 'secondary' : 'ghost'}
                onClick={() => onClick(route.path)}
                className='w-full justify-start'
              >
                {route.component}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className='hidden lg:flex items-center gap-2 overflow-x-auto'>
      {routes.map((route, index) => (
        <NavButton
          key={index}
          href={route.path}
          label={route.component}
          isActive={route.path === pathname}
        />
      ))}
    </nav>
  )
}

export default Navigation
