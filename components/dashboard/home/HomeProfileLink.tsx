'use client'

import { useState } from 'react'
import BaseEditText from '../BaseEditText'

const HomeProfileLink = () => {
  const [link, setLink] = useState('https://example.com/profile')

  return (
    <div className="p-4 bg-primary/20 rounded-4xl">
      <BaseEditText
        value={link}
        onSave={setLink}
        textClassName="text-blue-600 underline break-all"
        inputClassName="text-sm"
      />
    </div>
  )
}

export default HomeProfileLink