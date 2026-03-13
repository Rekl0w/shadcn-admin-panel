import { ChevronRightIcon } from "@/components/ui/chevron-right";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

export interface NavMainItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export function NavMain({ items }: { items: NavMainItem[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, state } = useSidebar();
  const { t } = useTranslation("sidebar");
  const isCollapsed = !isMobile && state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("nav.platform", "Platform")}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            item.url === location.pathname ||
            item.items?.some((sub) => sub.url === location.pathname);
          const hasSubItems = Boolean(item.items?.length);

          if (!hasSubItems) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link to={item.url} />}
                  tooltip={item.title}
                  isActive={isActive}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          if (isCollapsed) {
            return (
              <DropdownMenu key={item.title}>
                <SidebarMenuItem>
                  <DropdownMenuTrigger
                    render={
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                      />
                    }
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRightIcon size={16} className="ml-auto" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 rounded-lg"
                    side="right"
                    align="start"
                    sideOffset={12}
                  >
                    <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium text-foreground">
                      {item.title}
                    </DropdownMenuLabel>
                    {item.items?.map((subItem) => (
                      <DropdownMenuItem
                        key={subItem.title}
                        onClick={() => navigate(subItem.url)}
                        className={
                          subItem.url === location.pathname
                            ? "bg-accent text-accent-foreground"
                            : undefined
                        }
                      >
                        <span>{subItem.title}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </SidebarMenuItem>
              </DropdownMenu>
            );
          }

          return (
            <Collapsible
              key={item.title}
              defaultOpen={isActive || item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={<SidebarMenuButton tooltip={item.title} />}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRightIcon
                    size={16}
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          render={<Link to={subItem.url} />}
                          isActive={subItem.url === location.pathname}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
