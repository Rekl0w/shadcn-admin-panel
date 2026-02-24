import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useThemeStore, colorThemes, type ColorTheme } from "@/store/theme-store"

export default function SettingsPage() {
  const { mode, setMode, colorTheme, setColorTheme, radius, setRadius } = useThemeStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="admin@example.com" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself..." />
              </div>
              <Button onClick={() => toast.success("Profile updated!")}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company</CardTitle>
              <CardDescription>Manage company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://acme.com" type="url" />
                </div>
              </div>
              <Button onClick={() => toast.success("Company info updated!")}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the look and feel of the admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Mode</Label>
                <Select value={mode} onValueChange={(value) => setMode(value as "light" | "dark" | "system")}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-5 gap-3">
                  {(Object.keys(colorThemes) as ColorTheme[]).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setColorTheme(theme)}
                      className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all hover:border-primary/50 ${
                        colorTheme === theme
                          ? "border-primary bg-primary/5"
                          : "border-muted"
                      }`}
                    >
                      <div
                        className="h-8 w-8 rounded-full"
                        style={{
                          background: colorThemes[theme].light.primary,
                        }}
                      />
                      <span className="text-xs font-medium">
                        {colorThemes[theme].label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Border Radius</Label>
                  <span className="text-sm text-muted-foreground">{radius.toFixed(2)}rem</span>
                </div>
                <div className="flex gap-2">
                  {[0, 0.25, 0.5, 0.625, 0.75, 1.0].map((r) => (
                    <Button
                      key={r}
                      variant={radius === r ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRadius(r)}
                    >
                      {r}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "marketing", label: "Marketing emails", desc: "Receive emails about new products and features" },
                { id: "social", label: "Social notifications", desc: "Receive notifications about social activity" },
                { id: "security", label: "Security alerts", desc: "Receive alerts about account security" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.id === "security"} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage API keys and endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">API Base URL</Label>
                <Input id="api-url" defaultValue="http://localhost:3000/api" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" defaultValue="sk-xxxxxxxxxxxxx" />
              </div>
              <Button onClick={() => toast.success("API settings saved!")}>Save</Button>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => toast.error("This action is disabled in demo mode")}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
