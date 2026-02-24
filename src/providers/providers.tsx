import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from "react"
import { initializeTheme, useThemeStore } from "@/store/theme-store"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((s) => s.mode)
  const colorTheme = useThemeStore((s) => s.colorTheme)
  const radius = useThemeStore((s) => s.radius)

  useEffect(() => {
    initializeTheme()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const isDark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [mode, colorTheme, radius])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeInitializer>
        <TooltipProvider>
          {children}
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </ThemeInitializer>
    </QueryClientProvider>
  )
}
