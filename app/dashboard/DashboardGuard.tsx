'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const DashboardGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    const initAuth = async () => {
      if (!user?.id) {
        router.replace('/')
      }
    }
    initAuth()
  }, [])

  if (!user?.id) return null

  return <>{children}</>
}

export default DashboardGuard