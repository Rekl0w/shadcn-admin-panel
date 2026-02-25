# Admin Panel

A modern, themeable admin dashboard built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **shadcn/ui** (base-nova style).

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)

## Table of Contents

- [Admin Panel](#admin-panel)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Theme System](#theme-system)
    - [Architecture Overview](#architecture-overview)
    - [Color Themes](#color-themes)
    - [Dark / Light / System Mode](#dark--light--system-mode)
    - [Border Radius](#border-radius)
    - [How It Works Under the Hood](#how-it-works-under-the-hood)
    - [Adding a Custom Color Theme](#adding-a-custom-color-theme)
    - [Using Theme Values in Components](#using-theme-values-in-components)
  - [Project Structure](#project-structure)
  - [Service Layer](#service-layer)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [Tech Stack](#tech-stack)
  - [License](#license)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Theme System

The admin panel ships with a fully dynamic theme system that allows users to switch **color themes**, **appearance mode**, and **border radius** at runtime — all changes are persisted to `localStorage` and survive page reloads.

### Architecture Overview

```
src/
├── store/theme-store.ts          # Zustand store — state, color definitions, CSS applicator
├── components/theme/
│   ├── theme-customizer.tsx      # Side sheet UI for color & radius selection
│   └── mode-toggle.tsx           # Dropdown for light / dark / system toggle
├── providers/providers.tsx       # ThemeInitializer wrapper (applies theme on mount)
└── index.css                     # CSS custom properties (default values)
```

| Layer     | File                   | Responsibility                                                              |
| --------- | ---------------------- | --------------------------------------------------------------------------- |
| **State** | `theme-store.ts`       | Stores `mode`, `colorTheme`, `radius` via Zustand with `persist` middleware |
| **UI**    | `theme-customizer.tsx` | Visual picker rendered as a slide-out sheet                                 |
| **UI**    | `mode-toggle.tsx`      | Light / Dark / System dropdown                                              |
| **Init**  | `providers.tsx`        | Calls `initializeTheme()` on app mount, listens for state changes           |
| **CSS**   | `index.css`            | Declares CSS custom properties consumed by Tailwind                         |

### Color Themes

10 built-in color themes are available out of the box:

| Theme               | Primary (Light)        | Preview |
| ------------------- | ---------------------- | ------- |
| **Sky** _(default)_ | `oklch(0.59 0.14 242)` | 🔵      |
| **Blue**            | `oklch(0.55 0.20 255)` | 🔷      |
| **Green**           | `oklch(0.55 0.16 155)` | 🟢      |
| **Rose**            | `oklch(0.58 0.20 12)`  | 🌹      |
| **Orange**          | `oklch(0.65 0.18 55)`  | 🟠      |
| **Purple**          | `oklch(0.55 0.20 290)` | 🟣      |
| **Emerald**         | `oklch(0.60 0.15 165)` | 💚      |
| **Violet**          | `oklch(0.54 0.22 275)` | 💜      |
| **Amber**           | `oklch(0.70 0.16 75)`  | 🟡      |
| **Red**             | `oklch(0.55 0.22 25)`  | 🔴      |

Each theme defines **both light and dark** variants with the following CSS custom properties:

- `--primary` / `--primary-foreground`
- `--chart-1` through `--chart-5`
- `--sidebar-primary` / `--sidebar-primary-foreground`

All colors use the **OKLCH** color space for perceptually uniform brightness across themes.

### Dark / Light / System Mode

The mode toggle supports three states:

| Mode     | Behavior                                                |
| -------- | ------------------------------------------------------- |
| `light`  | Forces light appearance                                 |
| `dark`   | Forces dark appearance (adds `.dark` class to `<html>`) |
| `system` | Follows `prefers-color-scheme` media query              |

The resolved mode is used to pick either the `light` or `dark` variant from the active color theme.

### Border Radius

A continuous slider controls the global `--radius` CSS variable:

- **Range:** `0rem` (square) → `1rem` (fully rounded)
- **Default:** `0.625rem`
- **Step:** `0.05rem`

All shadcn/ui components derive their border radius from this single variable via Tailwind's `@theme inline` block:

```css
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
/* ... */
```

### How It Works Under the Hood

1. **On app mount**, `ThemeInitializer` in `providers.tsx` calls `initializeTheme()` which reads persisted state from `localStorage` key `"theme-storage"` and applies CSS variables to `document.documentElement`.

2. **When user selects a theme**, Zustand's `setColorTheme()` updates state and immediately calls `applyTheme()`:

   ```ts
   // theme-store.ts
   setColorTheme: (colorTheme) => {
     set({ colorTheme });
     applyTheme(colorTheme, get().mode, get().radius);
   };
   ```

3. **`applyTheme()` does three things:**
   - Toggles the `.dark` class on `<html>`
   - Sets all color CSS variables via `style.setProperty()`
   - Sets `--radius`

4. **Tailwind picks up the changes** because all design tokens are mapped through `@theme inline` in `index.css`:

   ```css
   @theme inline {
     --color-primary: var(--primary);
     --color-chart-1: var(--chart-1);
     /* ... */
   }
   ```

5. **Persistence** is handled by Zustand's `persist` middleware — the entire theme state is serialized to `localStorage` under `"theme-storage"`.

### Adding a Custom Color Theme

To add a new color theme (e.g., **Teal**):

**Step 1 — Add the type:**

```ts
// src/store/theme-store.ts
export type ColorTheme =
  | "sky"
  | "blue"
  // ...existing themes...
  | "teal"; // ← add here
```

**Step 2 — Define colors:**

```ts
// src/store/theme-store.ts
export const colorThemes: Record<
  ColorTheme,
  { light: ThemeColors; dark: ThemeColors; label: string }
> = {
  // ...existing themes...
  teal: {
    label: "Teal",
    light: {
      primary: "oklch(0.60 0.13 185)",
      primaryForeground: "oklch(0.98 0.01 185)",
      chart1: "oklch(0.83 0.08 178)",
      chart2: "oklch(0.75 0.11 180)",
      chart3: "oklch(0.67 0.13 183)",
      chart4: "oklch(0.60 0.13 185)",
      chart5: "oklch(0.50 0.11 188)",
      sidebarPrimary: "oklch(0.60 0.13 185)",
      sidebarPrimaryForeground: "oklch(0.98 0.01 185)",
    },
    dark: {
      primary: "oklch(0.70 0.13 185)",
      primaryForeground: "oklch(0.25 0.05 188)",
      chart1: "oklch(0.83 0.08 178)",
      chart2: "oklch(0.75 0.11 180)",
      chart3: "oklch(0.67 0.13 183)",
      chart4: "oklch(0.60 0.13 185)",
      chart5: "oklch(0.50 0.11 188)",
      sidebarPrimary: "oklch(0.75 0.11 180)",
      sidebarPrimaryForeground: "oklch(0.25 0.05 188)",
    },
  },
};
```

**Step 3 — Add a Tailwind preview color:**

```tsx
// src/components/theme/theme-customizer.tsx
const colorPreviews: Record<ColorTheme, string> = {
  // ...existing previews...
  teal: "bg-teal-500",
};
```

**Step 4 — Add translation keys:**

```json
// src/i18n/locales/en/common.json
{
  "themeCustomizer": {
    "colors": {
      "teal": "Teal"
    }
  }
}
```

```json
// src/i18n/locales/tr/common.json
{
  "themeCustomizer": {
    "colors": {
      "teal": "Turkuaz"
    }
  }
}
```

That's it — the new theme will automatically appear in the customizer grid.

### Using Theme Values in Components

All theme colors are available as standard Tailwind utility classes:

```tsx
// Primary color
<div className="bg-primary text-primary-foreground" />

// Chart colors (useful for recharts)
<div className="fill-chart-1 stroke-chart-2" />

// Sidebar colors
<div className="bg-sidebar-primary text-sidebar-primary-foreground" />

// Border radius
<div className="rounded-lg" />   {/* Uses --radius */}
<div className="rounded-sm" />   {/* Uses --radius - 4px */}
<div className="rounded-xl" />   {/* Uses --radius + 4px */}
```

For dynamic access in JS/TS:

```ts
// Read current theme from store (outside React)
import { useThemeStore } from "@/store/theme-store";
const { colorTheme, mode, radius } = useThemeStore.getState();

// Read from CSS variable
const primary = getComputedStyle(document.documentElement).getPropertyValue(
  "--primary",
);
```

---

## Project Structure

```
src/
├── components/
│   ├── data-table/         # Reusable data table with sorting, filtering, pagination
│   ├── layout/             # Admin layout, sidebar, header, navigation
│   ├── theme/              # Theme customizer & mode toggle
│   └── ui/                 # shadcn/ui components (base-nova style)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── pages/                  # Route pages (dashboard, users, products, orders, etc.)
├── providers/              # React context providers (QueryClient, Theme, Tooltip)
├── service/
│   ├── config/config.ts    # Axios instance with interceptors
│   ├── url/url.ts          # API endpoint URL constants
│   └── request/            # Domain-specific request functions
├── store/                  # Zustand stores (auth, theme)
└── i18n/                   # Internationalization (EN/TR)
```

---

## Service Layer

The API layer follows a 3-tier architecture:

| Layer       | Path                       | Purpose                                          |
| ----------- | -------------------------- | ------------------------------------------------ |
| **Config**  | `service/config/config.ts` | Axios instance, auth interceptor, error handling |
| **URL**     | `service/url/url.ts`       | Centralized endpoint constants                   |
| **Request** | `service/request/*.ts`     | Domain-grouped API calls                         |

```ts
// Usage example
import { usersRequest } from "@/service/request/users-request";

// GET all users
const { data } = await usersRequest.getAll({ page: 1, limit: 10 });

// GET single user
const { data } = await usersRequest.getById("user-123");

// POST create user
await usersRequest.create({
  name: "John",
  email: "john@example.com",
  password: "...",
});
```

The interceptor automatically:

- Attaches `Authorization: Bearer <token>` from the auth store
- Sets `Accept-Language` header from the current i18n locale
- Redirects to `/login` and clears auth state on `401` responses (except auth endpoints)

---

## Internationalization (i18n)

The project uses **react-i18next** with namespace-based JSON files:

```
src/i18n/locales/
├── en/
│   ├── common.json      # Shared strings (theme, months, days)
│   ├── dashboard.json   # Dashboard-specific
│   ├── products.json    # Products page
│   ├── users.json       # Users page
│   └── orders.json      # Orders page
└── tr/
    └── ...              # Same structure
```

Supported languages: **English** (`en`) and **Turkish** (`tr`).

---

## Tech Stack

| Technology     | Version   | Purpose                     |
| -------------- | --------- | --------------------------- |
| React          | 19        | UI library                  |
| TypeScript     | 5.9       | Type safety                 |
| Vite           | 7         | Build tool & dev server     |
| Tailwind CSS   | 4         | Utility-first CSS           |
| shadcn/ui      | base-nova | Component library           |
| Zustand        | 5         | State management            |
| TanStack Query | 5         | Server state & caching      |
| TanStack Table | 8         | Data tables                 |
| React Router   | 7         | Client-side routing         |
| Axios          | 1.x       | HTTP client                 |
| react-i18next  | 16        | Internationalization        |
| Recharts       | 3         | Charts & data visualization |
| Motion         | 12        | Animations                  |
| Lucide React   | 0.575     | Icon library                |

---

## License

MIT
