import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  useThemeStore,
  colorThemes,
  type ColorTheme,
} from "@/store/theme-store";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { mode, setMode, colorTheme, setColorTheme, radius, setRadius } =
    useThemeStore();
  const { t } = useTranslation("settings");
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t("tabs.general")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("tabs.appearance")}</TabsTrigger>
          <TabsTrigger value="notifications">
            {t("tabs.notifications")}
          </TabsTrigger>
          <TabsTrigger value="advanced">{t("tabs.advanced")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.title")}</CardTitle>
              <CardDescription>{t("profile.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("profile.name")}</Label>
                  <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("profile.email")}</Label>
                  <Input
                    id="email"
                    defaultValue="admin@example.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{t("profile.bio")}</Label>
                <Textarea id="bio" placeholder={t("profile.bioPlaceholder")} />
              </div>
              <Button onClick={() => toast.success(t("toasts.profileUpdated"))}>
                {tCommon("actions.saveChanges")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("company.title")}</CardTitle>
              <CardDescription>{t("company.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">{t("company.companyName")}</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">{t("company.website")}</Label>
                  <Input
                    id="website"
                    defaultValue="https://acme.com"
                    type="url"
                  />
                </div>
              </div>
              <Button onClick={() => toast.success(t("toasts.companyUpdated"))}>
                {tCommon("actions.saveChanges")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("theme.title")}</CardTitle>
              <CardDescription>{t("theme.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>{t("theme.mode")}</Label>
                <Select
                  value={mode}
                  onValueChange={(value) =>
                    setMode(value as "light" | "dark" | "system")
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      {tCommon("theme.light")}
                    </SelectItem>
                    <SelectItem value="dark">
                      {tCommon("theme.dark")}
                    </SelectItem>
                    <SelectItem value="system">
                      {tCommon("theme.system")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>{t("theme.colorTheme")}</Label>
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
                  <Label>{t("theme.borderRadius")}</Label>
                  <span className="text-sm text-muted-foreground">
                    {radius.toFixed(2)}rem
                  </span>
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
              <CardTitle>{t("notifications.title")}</CardTitle>
              <CardDescription>
                {t("notifications.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "marketing",
                  label: t("notifications.marketing"),
                  desc: t("notifications.marketingDesc"),
                },
                {
                  id: "social",
                  label: t("notifications.social"),
                  desc: t("notifications.socialDesc"),
                },
                {
                  id: "security",
                  label: t("notifications.security"),
                  desc: t("notifications.securityDesc"),
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
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
              <CardTitle>{t("api.title")}</CardTitle>
              <CardDescription>{t("api.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">{t("api.baseUrl")}</Label>
                <Input id="api-url" defaultValue="http://localhost:3000/api" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">{t("api.apiKey")}</Label>
                <Input
                  id="api-key"
                  type="password"
                  defaultValue="sk-xxxxxxxxxxxxx"
                />
              </div>
              <Button onClick={() => toast.success(t("toasts.apiSaved"))}>
                {tCommon("actions.save")}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">
                {t("danger.title")}
              </CardTitle>
              <CardDescription>{t("danger.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
                <div>
                  <p className="font-medium">{t("danger.deleteAccount")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("danger.deleteAccountDesc")}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => toast.error(t("toasts.deleteDisabled"))}
                >
                  {t("danger.delete")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
