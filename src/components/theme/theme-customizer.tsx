import { Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  useThemeStore,
  colorThemes,
  type ColorTheme,
} from "@/store/theme-store";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const colorPreviews: Record<ColorTheme, string> = {
  sky: "bg-sky-500",
  blue: "bg-blue-600",
  green: "bg-green-600",
  rose: "bg-rose-500",
  orange: "bg-orange-500",
  purple: "bg-purple-600",
  emerald: "bg-emerald-500",
  violet: "bg-violet-600",
  amber: "bg-amber-500",
  red: "bg-red-600",
};

export function ThemeCustomizer() {
  const { colorTheme, setColorTheme, radius, setRadius } = useThemeStore();
  const { t } = useTranslation("common");

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" />}>
        <Paintbrush className="h-4 w-4" />
        <span className="sr-only">{t("themeCustomizer.customizeTheme")}</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t("themeCustomizer.title")}</SheetTitle>
          <SheetDescription>
            {t("themeCustomizer.description")}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6 px-1">
          {/* Color Theme */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {t("themeCustomizer.colorTheme")}
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(colorThemes) as ColorTheme[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setColorTheme(theme)}
                  className={cn(
                    "group flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all hover:border-primary/50",
                    colorTheme === theme
                      ? "border-primary bg-primary/5"
                      : "border-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all",
                      colorPreviews[theme],
                      colorTheme === theme
                        ? "ring-primary"
                        : "ring-transparent",
                    )}
                  />
                  <span className="text-[10px] font-medium capitalize leading-none">
                    {t(`themeCustomizer.colors.${theme}`)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Radius */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                {t("themeCustomizer.borderRadius")}
              </Label>
              <span className="text-xs text-muted-foreground">
                {radius.toFixed(2)}rem
              </span>
            </div>
            <Slider
              value={[radius]}
              onValueChange={(v) => setRadius(Array.isArray(v) ? v[0] : v)}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("themeCustomizer.square")}</span>
              <span>{t("themeCustomizer.round")}</span>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {t("themeCustomizer.preview")}
            </Label>
            <div className="grid gap-2">
              <div className="flex gap-2">
                <Button size="sm">{t("themeCustomizer.primary")}</Button>
                <Button size="sm" variant="secondary">
                  {t("themeCustomizer.secondary")}
                </Button>
                <Button size="sm" variant="outline">
                  {t("themeCustomizer.outline")}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive">
                  {t("themeCustomizer.destructive")}
                </Button>
                <Button size="sm" variant="ghost">
                  {t("themeCustomizer.ghost")}
                </Button>
                <Button size="sm" variant="link">
                  {t("themeCustomizer.link")}
                </Button>
              </div>
              <div className="rounded-lg border bg-card p-3 text-card-foreground">
                <div className="text-sm font-medium">
                  {t("themeCustomizer.cardPreview")}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t("themeCustomizer.cardPreviewDesc")}
                </div>
              </div>
            </div>
          </div>

          {/* Reset */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setColorTheme("sky");
              setRadius(0.625);
            }}
          >
            {t("themeCustomizer.resetToDefault")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
