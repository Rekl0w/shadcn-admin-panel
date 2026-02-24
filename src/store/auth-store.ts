import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem("auth-token", token)
        set({ user, token, isAuthenticated: true })
      },
      logout: () => {
        localStorage.removeItem("auth-token")
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
