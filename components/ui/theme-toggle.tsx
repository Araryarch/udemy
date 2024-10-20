'use client'

import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { Lamp, MoonIcon, SunIcon } from 'lucide-react'

type Props = {
  classname?: string
}

const ThemeToggle = ({ classname }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={classname}
          onClick={() => {
            setIsDarkMode((prev) => !prev)
            document.body.classList.toggle('dark')
          }}
        >
          {isDarkMode ? <MoonIcon size={40} /> : <Lamp size={40} />}
        </TooltipTrigger>
        <TooltipContent>
          {isDarkMode ? 'dark mode' : 'light mode'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ThemeToggle
