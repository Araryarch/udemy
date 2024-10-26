'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuProps {
  children: React.ReactNode
  href: string
}

const MenuItem = ({ children, href }: MenuProps) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link
      className={cn(
        'mb-2 block rounded-md p-2 text-muted-foreground hover:bg-background hover:text-foreground',
        isActive &&
          'bg-mocha-base text-mocha-mauve hover:bg-mocha-surface0 hover:text-mocha-rosewater',
      )}
      href={href}
    >
      {children}
    </Link>
  )
}

export default MenuItem
