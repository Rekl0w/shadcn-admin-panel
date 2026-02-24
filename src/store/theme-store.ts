import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ThemeMode = "light" | "dark" | "system"

export type ColorTheme =
  | "sky"
  | "blue"
  | "green"
  | "rose"
  | "orange"
  | "purple"
  | "emerald"
  | "violet"
  | "amber"
  | "red"

export interface ThemeColors {
  primary: string
  primaryForeground: string
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  sidebarPrimary: string
  sidebarPrimaryForeground: string
}

export const colorThemes: Record<ColorTheme, { light: ThemeColors; dark: ThemeColors; label: string }> = {
  sky: {
    label: "Sky",
    light: {
      primary: "oklch(0.59 0.14 242)",
      primaryForeground: "oklch(0.98 0.01 237)",
      chart1: "oklch(0.83 0.10 230)",
      chart2: "oklch(0.75 0.14 233)",
      chart3: "oklch(0.68 0.15 237)",
      chart4: "oklch(0.59 0.14 242)",
      chart5: "oklch(0.50 0.12 243)",
      sidebarPrimary: "oklch(0.59 0.14 242)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 237)",
    },
    dark: {
      primary: "oklch(0.68 0.15 237)",
      primaryForeground: "oklch(0.29 0.06 243)",
      chart1: "oklch(0.83 0.10 230)",
      chart2: "oklch(0.75 0.14 233)",
      chart3: "oklch(0.68 0.15 237)",
      chart4: "oklch(0.59 0.14 242)",
      chart5: "oklch(0.50 0.12 243)",
      sidebarPrimary: "oklch(0.75 0.14 233)",
      sidebarPrimaryForeground: "oklch(0.29 0.06 243)",
    },
  },
  blue: {
    label: "Blue",
    light: {
      primary: "oklch(0.55 0.20 255)",
      primaryForeground: "oklch(0.98 0.01 255)",
      chart1: "oklch(0.80 0.12 250)",
      chart2: "oklch(0.72 0.16 252)",
      chart3: "oklch(0.63 0.19 255)",
      chart4: "oklch(0.55 0.20 255)",
      chart5: "oklch(0.47 0.17 258)",
      sidebarPrimary: "oklch(0.55 0.20 255)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 255)",
    },
    dark: {
      primary: "oklch(0.65 0.19 255)",
      primaryForeground: "oklch(0.25 0.06 258)",
      chart1: "oklch(0.80 0.12 250)",
      chart2: "oklch(0.72 0.16 252)",
      chart3: "oklch(0.63 0.19 255)",
      chart4: "oklch(0.55 0.20 255)",
      chart5: "oklch(0.47 0.17 258)",
      sidebarPrimary: "oklch(0.72 0.16 252)",
      sidebarPrimaryForeground: "oklch(0.25 0.06 258)",
    },
  },
  green: {
    label: "Green",
    light: {
      primary: "oklch(0.55 0.16 155)",
      primaryForeground: "oklch(0.98 0.01 155)",
      chart1: "oklch(0.82 0.10 148)",
      chart2: "oklch(0.72 0.14 150)",
      chart3: "oklch(0.63 0.16 153)",
      chart4: "oklch(0.55 0.16 155)",
      chart5: "oklch(0.45 0.13 158)",
      sidebarPrimary: "oklch(0.55 0.16 155)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 155)",
    },
    dark: {
      primary: "oklch(0.65 0.17 155)",
      primaryForeground: "oklch(0.25 0.05 158)",
      chart1: "oklch(0.82 0.10 148)",
      chart2: "oklch(0.72 0.14 150)",
      chart3: "oklch(0.63 0.16 153)",
      chart4: "oklch(0.55 0.16 155)",
      chart5: "oklch(0.45 0.13 158)",
      sidebarPrimary: "oklch(0.72 0.14 150)",
      sidebarPrimaryForeground: "oklch(0.25 0.05 158)",
    },
  },
  rose: {
    label: "Rose",
    light: {
      primary: "oklch(0.58 0.20 12)",
      primaryForeground: "oklch(0.98 0.01 12)",
      chart1: "oklch(0.82 0.10 5)",
      chart2: "oklch(0.73 0.15 8)",
      chart3: "oklch(0.65 0.19 10)",
      chart4: "oklch(0.58 0.20 12)",
      chart5: "oklch(0.48 0.18 15)",
      sidebarPrimary: "oklch(0.58 0.20 12)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 12)",
    },
    dark: {
      primary: "oklch(0.68 0.19 12)",
      primaryForeground: "oklch(0.25 0.06 15)",
      chart1: "oklch(0.82 0.10 5)",
      chart2: "oklch(0.73 0.15 8)",
      chart3: "oklch(0.65 0.19 10)",
      chart4: "oklch(0.58 0.20 12)",
      chart5: "oklch(0.48 0.18 15)",
      sidebarPrimary: "oklch(0.73 0.15 8)",
      sidebarPrimaryForeground: "oklch(0.25 0.06 15)",
    },
  },
  orange: {
    label: "Orange",
    light: {
      primary: "oklch(0.65 0.18 55)",
      primaryForeground: "oklch(0.98 0.01 55)",
      chart1: "oklch(0.85 0.10 48)",
      chart2: "oklch(0.78 0.14 50)",
      chart3: "oklch(0.72 0.17 53)",
      chart4: "oklch(0.65 0.18 55)",
      chart5: "oklch(0.55 0.16 58)",
      sidebarPrimary: "oklch(0.65 0.18 55)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 55)",
    },
    dark: {
      primary: "oklch(0.72 0.17 55)",
      primaryForeground: "oklch(0.28 0.06 58)",
      chart1: "oklch(0.85 0.10 48)",
      chart2: "oklch(0.78 0.14 50)",
      chart3: "oklch(0.72 0.17 53)",
      chart4: "oklch(0.65 0.18 55)",
      chart5: "oklch(0.55 0.16 58)",
      sidebarPrimary: "oklch(0.78 0.14 50)",
      sidebarPrimaryForeground: "oklch(0.28 0.06 58)",
    },
  },
  purple: {
    label: "Purple",
    light: {
      primary: "oklch(0.55 0.20 290)",
      primaryForeground: "oklch(0.98 0.01 290)",
      chart1: "oklch(0.82 0.10 283)",
      chart2: "oklch(0.72 0.15 286)",
      chart3: "oklch(0.63 0.18 288)",
      chart4: "oklch(0.55 0.20 290)",
      chart5: "oklch(0.45 0.18 293)",
      sidebarPrimary: "oklch(0.55 0.20 290)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 290)",
    },
    dark: {
      primary: "oklch(0.68 0.19 290)",
      primaryForeground: "oklch(0.25 0.06 293)",
      chart1: "oklch(0.82 0.10 283)",
      chart2: "oklch(0.72 0.15 286)",
      chart3: "oklch(0.63 0.18 288)",
      chart4: "oklch(0.55 0.20 290)",
      chart5: "oklch(0.45 0.18 293)",
      sidebarPrimary: "oklch(0.72 0.15 286)",
      sidebarPrimaryForeground: "oklch(0.25 0.06 293)",
    },
  },
  emerald: {
    label: "Emerald",
    light: {
      primary: "oklch(0.60 0.15 165)",
      primaryForeground: "oklch(0.98 0.01 165)",
      chart1: "oklch(0.83 0.10 158)",
      chart2: "oklch(0.75 0.13 160)",
      chart3: "oklch(0.67 0.15 163)",
      chart4: "oklch(0.60 0.15 165)",
      chart5: "oklch(0.50 0.13 168)",
      sidebarPrimary: "oklch(0.60 0.15 165)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 165)",
    },
    dark: {
      primary: "oklch(0.70 0.15 165)",
      primaryForeground: "oklch(0.25 0.05 168)",
      chart1: "oklch(0.83 0.10 158)",
      chart2: "oklch(0.75 0.13 160)",
      chart3: "oklch(0.67 0.15 163)",
      chart4: "oklch(0.60 0.15 165)",
      chart5: "oklch(0.50 0.13 168)",
      sidebarPrimary: "oklch(0.75 0.13 160)",
      sidebarPrimaryForeground: "oklch(0.25 0.05 168)",
    },
  },
  violet: {
    label: "Violet",
    light: {
      primary: "oklch(0.54 0.22 275)",
      primaryForeground: "oklch(0.98 0.01 275)",
      chart1: "oklch(0.82 0.10 268)",
      chart2: "oklch(0.72 0.16 271)",
      chart3: "oklch(0.63 0.19 273)",
      chart4: "oklch(0.54 0.22 275)",
      chart5: "oklch(0.45 0.19 278)",
      sidebarPrimary: "oklch(0.54 0.22 275)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 275)",
    },
    dark: {
      primary: "oklch(0.67 0.20 275)",
      primaryForeground: "oklch(0.25 0.06 278)",
      chart1: "oklch(0.82 0.10 268)",
      chart2: "oklch(0.72 0.16 271)",
      chart3: "oklch(0.63 0.19 273)",
      chart4: "oklch(0.54 0.22 275)",
      chart5: "oklch(0.45 0.19 278)",
      sidebarPrimary: "oklch(0.72 0.16 271)",
      sidebarPrimaryForeground: "oklch(0.25 0.06 278)",
    },
  },
  amber: {
    label: "Amber",
    light: {
      primary: "oklch(0.70 0.16 75)",
      primaryForeground: "oklch(0.25 0.05 78)",
      chart1: "oklch(0.87 0.08 68)",
      chart2: "oklch(0.80 0.12 70)",
      chart3: "oklch(0.75 0.15 73)",
      chart4: "oklch(0.70 0.16 75)",
      chart5: "oklch(0.60 0.14 78)",
      sidebarPrimary: "oklch(0.70 0.16 75)",
      sidebarPrimaryForeground: "oklch(0.25 0.05 78)",
    },
    dark: {
      primary: "oklch(0.77 0.15 75)",
      primaryForeground: "oklch(0.28 0.05 78)",
      chart1: "oklch(0.87 0.08 68)",
      chart2: "oklch(0.80 0.12 70)",
      chart3: "oklch(0.75 0.15 73)",
      chart4: "oklch(0.70 0.16 75)",
      chart5: "oklch(0.60 0.14 78)",
      sidebarPrimary: "oklch(0.80 0.12 70)",
      sidebarPrimaryForeground: "oklch(0.28 0.05 78)",
    },
  },
  red: {
    label: "Red",
    light: {
      primary: "oklch(0.55 0.22 25)",
      primaryForeground: "oklch(0.98 0.01 25)",
      chart1: "oklch(0.82 0.10 18)",
      chart2: "oklch(0.72 0.16 20)",
      chart3: "oklch(0.63 0.19 23)",
      chart4: "oklch(0.55 0.22 25)",
      chart5: "oklch(0.45 0.19 28)",
      sidebarPrimary: "oklch(0.55 0.22 25)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 25)",
    },
    dark: {
      primary: "oklch(0.68 0.20 25)",
      primaryForeground: "oklch(0.25 0.06 28)",
      chart1: "oklch(0.82 0.10 18)",
      chart2: "oklch(0.72 0.16 20)",
      chart3: "oklch(0.63 0.19 23)",
      chart4: "oklch(0.55 0.22 25)",
      chart5: "oklch(0.45 0.19 28)",
      sidebarPrimary: "oklch(0.72 0.16 20)",
      sidebarPrimaryForeground: "oklch(0.25 0.06 28)",
    },
  },
}

interface ThemeState {
  mode: ThemeMode
  colorTheme: ColorTheme
  radius: number
  setMode: (mode: ThemeMode) => void
  setColorTheme: (theme: ColorTheme) => void
  setRadius: (radius: number) => void
  resolvedMode: () => "light" | "dark"
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "system",
      colorTheme: "sky",
      radius: 0.625,
      setMode: (mode) => {
        set({ mode })
        applyTheme(get().colorTheme, mode, get().radius)
      },
      setColorTheme: (colorTheme) => {
        set({ colorTheme })
        applyTheme(colorTheme, get().mode, get().radius)
      },
      setRadius: (radius) => {
        set({ radius })
        applyTheme(get().colorTheme, get().mode, radius)
      },
      resolvedMode: () => {
        const { mode } = get()
        if (mode === "system") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        }
        return mode
      },
    }),
    {
      name: "theme-storage",
    }
  )
)

export function applyTheme(
  colorTheme: ColorTheme,
  mode: ThemeMode,
  radius: number
) {
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

  const colors = isDark
    ? colorThemes[colorTheme].dark
    : colorThemes[colorTheme].light

  root.style.setProperty("--primary", colors.primary)
  root.style.setProperty("--primary-foreground", colors.primaryForeground)
  root.style.setProperty("--chart-1", colors.chart1)
  root.style.setProperty("--chart-2", colors.chart2)
  root.style.setProperty("--chart-3", colors.chart3)
  root.style.setProperty("--chart-4", colors.chart4)
  root.style.setProperty("--chart-5", colors.chart5)
  root.style.setProperty("--sidebar-primary", colors.sidebarPrimary)
  root.style.setProperty(
    "--sidebar-primary-foreground",
    colors.sidebarPrimaryForeground
  )
  root.style.setProperty("--radius", `${radius}rem`)
}

export function initializeTheme() {
  const stored = localStorage.getItem("theme-storage")
  if (stored) {
    try {
      const { state } = JSON.parse(stored)
      applyTheme(
        state.colorTheme || "sky",
        state.mode || "system",
        state.radius ?? 0.625
      )
    } catch {
      applyTheme("sky", "system", 0.625)
    }
  } else {
    applyTheme("sky", "system", 0.625)
  }
}
