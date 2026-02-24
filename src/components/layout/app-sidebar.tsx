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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavMain, type NavMainItem } from "@/components/layout/nav-main";
import {
  NavProjects,
  type NavProjectItem,
} from "@/components/layout/nav-projects";
import { NavUser } from "@/components/layout/nav-user";
import { TeamSwitcher, type Team } from "@/components/layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation("sidebar");

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
  ];

  const navMain: NavMainItem[] = [
    {
      title: t("nav.dashboard"),
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: t("nav.overview"), url: "/" },
        { title: t("nav.analytics"), url: "/analytics" },
      ],
    },
    {
      title: t("nav.users"),
      url: "/users",
      icon: Users,
      items: [
        { title: t("nav.allUsers"), url: "/users" },
        { title: t("nav.roles"), url: "/users/roles" },
      ],
    },
    {
      title: t("nav.products"),
      url: "/products",
      icon: Package,
      items: [
        { title: t("nav.allProducts"), url: "/products" },
        { title: t("nav.categories"), url: "/products/categories" },
      ],
    },
    {
      title: t("nav.orders"),
      url: "/orders",
      icon: ShoppingCart,
      items: [
        { title: t("nav.allOrders"), url: "/orders" },
        { title: t("nav.returns"), url: "/orders/returns" },
      ],
    },
    {
      title: t("nav.documentation"),
      url: "/docs",
      icon: BookOpen,
      items: [
        { title: t("nav.introduction"), url: "/docs" },
        { title: t("nav.apiReference"), url: "/docs/api" },
      ],
    },
    {
      title: t("nav.aiModels"),
      url: "/models",
      icon: Bot,
      items: [
        { title: t("nav.explorer"), url: "/models" },
        { title: t("nav.training"), url: "/models/training" },
      ],
    },
    {
      title: t("nav.settings"),
      url: "/settings",
      icon: Settings2,
      items: [
        { title: t("nav.general"), url: "/settings" },
        { title: t("nav.appearance"), url: "/settings/appearance" },
        { title: t("nav.team"), url: "/settings/team" },
        { title: t("nav.billing"), url: "/settings/billing" },
      ],
    },
  ];

  const quickLinks: NavProjectItem[] = [
    {
      name: t("quickLinks.designSystem"),
      url: "/",
      icon: Frame,
    },
    {
      name: t("quickLinks.salesReport"),
      url: "/analytics",
      icon: PieChart,
    },
    {
      name: t("quickLinks.roadmap"),
      url: "/",
      icon: Map,
    },
  ];

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
  );
}
