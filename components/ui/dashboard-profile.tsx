'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '@/store/slices/userSlice'
import { myToast } from '@/lib/utils'

const DashboardProfile = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(logout())
    router.push("/")
    myToast.success("User Logged out")
  }

  const handleSettings = () => {
    router.push("/dashboard/settings")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/khurram.png" alt="Khurram Baqai" />
            <AvatarFallback>KB</AvatarFallback>
          </Avatar>
          <span>Khurram Baqai</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleSettings}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DashboardProfile