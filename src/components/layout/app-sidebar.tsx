import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavMain, type NavMainItem } from "@/components/layout/nav-main";
import {
  NavProjects,
  type NavProjectItem,
} from "@/components/layout/nav-projects";
import { NavUser } from "@/components/layout/nav-user";
import { TeamSwitcher, type Team } from "@/components/layout/team-switcher";
import { BookOpenIcon } from "@/components/ui/book-open";
import { BotIcon } from "@/components/ui/bot";
import { FrameIcon } from "@/components/ui/frame";
import { LayoutDashboardIcon } from "@/components/ui/layout-dashboard";
import { MapIcon } from "@/components/ui/map";
import { PackageIcon } from "@/components/ui/package";
import { PieChartIcon } from "@/components/ui/pie-chart";
import { SettingsIcon } from "@/components/ui/settings";
import { ShoppingCartIcon } from "@/components/ui/shopping-cart";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UsersIcon } from "@/components/ui/users";

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
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        { title: t("nav.overview"), url: "/" },
        { title: t("nav.analytics"), url: "/analytics" },
      ],
    },
    {
      title: t("nav.users"),
      url: "/users",
      icon: UsersIcon,
      items: [
        { title: t("nav.allUsers"), url: "/users" },
        { title: t("nav.roles"), url: "/users/roles" },
      ],
    },
    {
      title: t("nav.products"),
      url: "/products",
      icon: PackageIcon,
      items: [
        { title: t("nav.allProducts"), url: "/products" },
        { title: t("nav.categories"), url: "/products/categories" },
      ],
    },
    {
      title: t("nav.orders"),
      url: "/orders",
      icon: ShoppingCartIcon,
      items: [
        { title: t("nav.allOrders"), url: "/orders" },
        { title: t("nav.returns"), url: "/orders/returns" },
      ],
    },
    {
      title: t("nav.documentation"),
      url: "/docs",
      icon: BookOpenIcon,
      items: [
        { title: t("nav.introduction"), url: "/docs" },
        { title: t("nav.apiReference"), url: "/docs/api" },
      ],
    },
    {
      title: t("nav.aiModels"),
      url: "/models",
      icon: BotIcon,
      items: [
        { title: t("nav.explorer"), url: "/models" },
        { title: t("nav.training"), url: "/models/training" },
      ],
    },
    {
      title: t("nav.settings"),
      url: "/settings",
      icon: SettingsIcon,
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
      icon: FrameIcon,
    },
    {
      name: t("quickLinks.salesReport"),
      url: "/analytics",
      icon: PieChartIcon,
    },
    {
      name: t("quickLinks.roadmap"),
      url: "/",
      icon: MapIcon,
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
