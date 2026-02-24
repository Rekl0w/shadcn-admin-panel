import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation, Link } from "react-router"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { ThemeCustomizer } from "@/components/theme/theme-customizer"

const routeNames: Record<string, string> = {
  "/": "Dashboard",
  "/analytics": "Analytics",
  "/users": "Users",
  "/users/roles": "Roles",
  "/products": "Products",
  "/products/categories": "Categories",
  "/orders": "Orders",
  "/orders/returns": "Returns",
  "/settings": "Settings",
  "/settings/appearance": "Appearance",
  "/settings/team": "Team",
  "/settings/billing": "Billing",
  "/docs": "Documentation",
  "/docs/api": "API Reference",
  "/models": "AI Models",
  "/models/training": "Training",
}

export function Header() {
  const location = useLocation()
  const pathSegments = location.pathname.split("/").filter(Boolean)

  const breadcrumbs = pathSegments.map((_, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/")
    return {
      path,
      name: routeNames[path] || pathSegments[index].charAt(0).toUpperCase() + pathSegments[index].slice(1),
    }
  })

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink render={<Link to="/" />}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.path} className="flex items-center gap-1.5">
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link to={crumb.path} />}>
                      {crumb.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
            {breadcrumbs.length === 0 && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <ThemeCustomizer />
        <ModeToggle />
      </div>
    </header>
  )
}
