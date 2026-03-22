'use client'

import { AppSidebar } from "@/components/sections/app-sidebar/app-sidebar"
import DashboardProfile from "@/components/ui/dashboard-profile"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import DashboardGuard from "./DashboardGuard"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const lastSegment = pathname.split("/").filter(Boolean).pop() || ''

  const title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)

  return (
    <SidebarProvider className={`${theme === 'light' ? "bg-background/70" : "bg-background/95"}`}>
      <AppSidebar />
      <main className="w-full h-full">
        <div>
          <SidebarTrigger />
          <div className='pt-6'>
            <div className='w-full flex px-4 items-center justify-between'>
              <h2 className='text-3xl font-semibold' >{title}</h2>
              <div className="flex gap-8">
                <DashboardProfile />
              </div>
            </div>
            <Separator className="flex-1 bg-primary/30" />
            <div className='p-4' >
                <DashboardGuard>{children}</DashboardGuard>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}