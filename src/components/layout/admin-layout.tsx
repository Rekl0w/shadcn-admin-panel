import { Outlet } from "react-router"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Header } from "@/components/layout/header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
