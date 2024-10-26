'use client'

import { PersonStandingIcon } from 'lucide-react'
import ThemeToggle from '../../components/ui/theme-toggle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import darkBg from '@/app/bg-dark.png'
import lightBg from '@/app/bg-light.png'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname()
  const isRoot = pathname === '/'

  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center bg-[url(${lightBg})] bg-cover py-10 transition-all duration-500 ease-in-out dark:bg-[url(${darkBg})]`}
    >
      <div className="py-2">
        <PersonStandingIcon size={45} />
      </div>
      <div
        className={`flex flex-col items-center justify-center rounded-sm ${isRoot ? '' : 'border-[1px]'} border-secondary px-2 py-4 backdrop-blur-lg dark:border-white`}
      >
        {children}
      </div>
      <div className="absolute right-0 top-0 p-10">
        <ThemeToggle />
      </div>
      <div className="absolute left-0 top-0 p-10">
        <Link href={'/'}>
          <p>BACK TO HOME</p>
        </Link>
      </div>
    </div>
  )
}

export default Layout
