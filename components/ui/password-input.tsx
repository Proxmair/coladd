'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from './floatingInput'
import { EyeClosedIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

interface PasswordInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
}

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  className,
  disabled,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-full">
        <FloatingLabelInput
          id={id}
          type={showPassword ? 'text' : 'password'}
          label={label}
          value={value}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          className='h-10.5'
        />
      </div>

      <div className="h-10.5 w-10.5">
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          className="h-full w-full hover:text-primary border-primary/20! bg-transparent!"
        >
          {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
        </Button>
      </div>
    </div>
  )
}