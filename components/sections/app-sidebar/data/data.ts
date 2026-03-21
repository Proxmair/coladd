import {
  LayoutDashboard,
  Settings,
  User,
  Wand,
} from "lucide-react"

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/dashboard/home",
    icon: LayoutDashboard,
  },
  {
    label: "Blogs",
    href: "/dashboard/blogs",
    icon: User,
  },
  {
    label: "Videos",
    href: "/dashboard/videos",
    icon: Wand,
  },
  {
    label: "Patient Information",
    href: "/dashboard/leaflets",
    icon: Settings,
  },
]