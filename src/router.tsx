import { createBrowserRouter } from "react-router"
import { AdminLayout } from "@/components/layout/admin-layout"

export const router = createBrowserRouter([
  {
    path: "/login",
    lazy: async () => {
      const { default: LoginPage } = await import("@/pages/login")
      return { Component: LoginPage }
    },
  },
  {
    path: "/",
    Component: AdminLayout,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: DashboardPage } = await import("@/pages/dashboard")
          return { Component: DashboardPage }
        },
      },
      {
        path: "analytics",
        lazy: async () => {
          const { default: AnalyticsPage } = await import("@/pages/analytics")
          return { Component: AnalyticsPage }
        },
      },
      {
        path: "users",
        lazy: async () => {
          const { default: UsersPage } = await import("@/pages/users/index")
          return { Component: UsersPage }
        },
      },
      {
        path: "users/roles",
        lazy: async () => {
          const { default: UsersPage } = await import("@/pages/users/index")
          return { Component: UsersPage }
        },
      },
      {
        path: "products",
        lazy: async () => {
          const { default: ProductsPage } = await import("@/pages/products/index")
          return { Component: ProductsPage }
        },
      },
      {
        path: "products/categories",
        lazy: async () => {
          const { default: ProductsPage } = await import("@/pages/products/index")
          return { Component: ProductsPage }
        },
      },
      {
        path: "orders",
        lazy: async () => {
          const { default: OrdersPage } = await import("@/pages/orders/index")
          return { Component: OrdersPage }
        },
      },
      {
        path: "orders/returns",
        lazy: async () => {
          const { default: OrdersPage } = await import("@/pages/orders/index")
          return { Component: OrdersPage }
        },
      },
      {
        path: "settings",
        lazy: async () => {
          const { default: SettingsPage } = await import("@/pages/settings")
          return { Component: SettingsPage }
        },
      },
      {
        path: "settings/:tab",
        lazy: async () => {
          const { default: SettingsPage } = await import("@/pages/settings")
          return { Component: SettingsPage }
        },
      },
      {
        path: "*",
        lazy: async () => {
          const { default: NotFoundPage } = await import("@/pages/not-found")
          return { Component: NotFoundPage }
        },
      },
    ],
  },
])
