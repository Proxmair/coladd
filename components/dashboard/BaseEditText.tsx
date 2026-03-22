'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'

interface BaseEditTextProps {
  value: string
  onSave: (val: string) => void
  className?: string
  textClassName?: string
  inputClassName?: string
}

const BaseEditText = ({
  value,
  onSave,
  className = '',
  textClassName = '',
  inputClassName = '',
}: BaseEditTextProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)

  const handleSave = () => {
    setIsEditing(false)
    onSave(localValue)
  }

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      
      {/* Text / Input */}
      {!isEditing ? (
        <p className={textClassName}>{localValue}</p>
      ) : (
        <input
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md outline-none ${inputClassName}`}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') setIsEditing(false)
          }}
        />
      )}

      {/* Button */}
      {!isEditing ? (
        <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>
          <Edit size={16} />
        </Button>
      ) : (
        <Button size="sm" onClick={handleSave}>
          <Save size={16} />
        </Button>
      )}
    </div>
  )
}

export default BaseEditText