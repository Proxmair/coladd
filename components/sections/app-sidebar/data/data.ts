import {
  Handshake,
  Book,
  Play,
  Newspaper,
  House
} from "lucide-react"

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/dashboard/home",
    icon: House,
  },
  {
    label: "Blogs",
    href: "/dashboard/blogs",
    icon: Newspaper,
  },
  {
    label: "Videos",
    href: "/dashboard/videos",
    icon: Play,
  },
  {
    label: "Patient Information",
    href: "/dashboard/leaflets",
    icon: Book,
  },
  {
    label: "Social Links",
    href: "/dashboard/social",
    icon: Handshake,
  },

]