import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  Package,
  PieChart,
  Settings2,
  ShoppingCart,
  Users,
} from "lucide-react"
import { NavMain, type NavMainItem } from "@/components/layout/nav-main"
import { NavProjects, type NavProjectItem } from "@/components/layout/nav-projects"
import { NavUser } from "@/components/layout/nav-user"
import { TeamSwitcher, type Team } from "@/components/layout/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const teams: Team[] = [
  {
    name: "Admin Panel",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Dev Team",
    logo: Command,
    plan: "Free",
  },
]

const navMain: NavMainItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      { title: "Overview", url: "/" },
      { title: "Analytics", url: "/analytics" },
    ],
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    items: [
      { title: "All Users", url: "/users" },
      { title: "Roles", url: "/users/roles" },
    ],
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
    items: [
      { title: "All Products", url: "/products" },
      { title: "Categories", url: "/products/categories" },
    ],
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCart,
    items: [
      { title: "All Orders", url: "/orders" },
      { title: "Returns", url: "/orders/returns" },
    ],
  },
  {
    title: "Documentation",
    url: "/docs",
    icon: BookOpen,
    items: [
      { title: "Introduction", url: "/docs" },
      { title: "API Reference", url: "/docs/api" },
    ],
  },
  {
    title: "AI Models",
    url: "/models",
    icon: Bot,
    items: [
      { title: "Explorer", url: "/models" },
      { title: "Training", url: "/models/training" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
    items: [
      { title: "General", url: "/settings" },
      { title: "Appearance", url: "/settings/appearance" },
      { title: "Team", url: "/settings/team" },
      { title: "Billing", url: "/settings/billing" },
    ],
  },
]

const quickLinks: NavProjectItem[] = [
  {
    name: "Design System",
    url: "/",
    icon: Frame,
  },
  {
    name: "Sales Report",
    url: "/analytics",
    icon: PieChart,
  },
  {
    name: "Roadmap",
    url: "/",
    icon: Map,
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={quickLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
