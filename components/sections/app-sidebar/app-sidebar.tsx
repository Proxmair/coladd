import {
  Sidebar,
} from "@/components/ui/sidebar"

import AppSidebarHeader from "./helper/app-side-bar-header"
import AppSideBarContent from './helper/app-side-bar-content'
export function AppSidebar() {

  return (
    <Sidebar collapsible="icon">
     <AppSidebarHeader/>
      <AppSideBarContent/>
    </Sidebar>
  )
}