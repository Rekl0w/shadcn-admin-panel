import { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("password")
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password) {
      setAuth(
        {
          id: "1",
          name: "Admin User",
          email,
          role: "admin",
          avatar: "",
        },
        "fake-jwt-token"
      )
      toast.success("Welcome back!")
      navigate("/")
    } else {
      toast.error("Invalid credentials")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Demo: any email/password will work
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
