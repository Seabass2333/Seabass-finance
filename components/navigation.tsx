'use client'

import { usePathname } from 'next/navigation'
import NavButton from '@/components/nav-button'

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
  const pathname = usePathname()
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
