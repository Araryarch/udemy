'use client'

import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'
import { Lamp, MoonIcon } from 'lucide-react'

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
          {isDarkMode ? <MoonIcon size={30} /> : <Lamp size={30} />}
        </TooltipTrigger>
        <TooltipContent>
          {isDarkMode ? 'dark mode' : 'light mode'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ThemeToggle
