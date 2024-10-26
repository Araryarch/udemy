import React from 'react'
import MenuTitle from './menu-title'
import MenuItem from './menu-item'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/theme-toggle'

const MainMenu = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-auto bg-muted p-3">
      <div className="border-b-4 border-double border-b-background pb-4">
        <MenuTitle />
      </div>
      <div className="grow py-4">
        <MenuItem href="/dashboard">My Dashboard</MenuItem>
        <MenuItem href="/dashboard/teams">Teams</MenuItem>
        <MenuItem href="/dashboard/employees">Employees</MenuItem>
        <MenuItem href="/dashboard/account">Account</MenuItem>
        <MenuItem href="/dashboard/settings">Settings</MenuItem>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-mocha-mauve dark:bg-mocha-base">
            TP
          </AvatarFallback>
        </Avatar>
        <Link href={'/'} className="hover:underline">
          Logout
        </Link>
        <ThemeToggle classname="ml-auto" />
      </div>
    </div>
  )
}

export default MainMenu
