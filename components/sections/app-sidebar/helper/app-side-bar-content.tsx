"use client"

import Link from "next/link"

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { NAV_ITEMS } from "../data/data"
const AppSideBarContent = () => {
  const { state } = useSidebar()
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.label}>
                  
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default AppSideBarContent