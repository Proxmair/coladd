'use client'

import { useState } from 'react'
import BaseEditText from '../BaseEditText'

const HomeHeading = () => {
  const [heading, setHeading] = useState('This is your heading')

  return (
    <div className="p-4 bg-primary/20 rounded-4xl">
      <BaseEditText
        value={heading}
        onSave={setHeading}
        textClassName="text-xl font-semibold"
      />
    </div>
  )
}

export default HomeHeading