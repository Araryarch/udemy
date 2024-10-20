import * as React from 'react'

import { cn } from '@/lib/utils'
import { Input } from './input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          {...props}
          className={cn('pr-10', className)}
          ref={ref}
        />
        <span className="absolute right-4 top-[8px] cursor-pointer select-none">
          {showPassword ? (
            <EyeIcon size={20} onClick={() => setShowPassword(false)} />
          ) : (
            <EyeOffIcon size={20} onClick={() => setShowPassword(true)} />
          )}
        </span>
      </div>
    )
  },
)
PasswordInput.displayName = 'Input'

export { PasswordInput }
