import { Monitor } from "lucide-react";
import { MoonIcon } from "@/components/ui/moon";
import { SunIcon } from "@/components/ui/sun";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeStore } from "@/store/theme-store";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
  const { mode, setMode } = useThemeStore();
  const { t } = useTranslation("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
        <SunIcon
          size={16}
          className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />
        <MoonIcon
          size={16}
          className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        />
        <span className="sr-only">{t("theme.toggleTheme")}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setMode("light")}>
          <SunIcon size={16} className="mr-2" />
          {t("theme.light")}
          {mode === "light" && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode("dark")}>
          <MoonIcon size={16} className="mr-2" />
          {t("theme.dark")}
          {mode === "dark" && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          {t("theme.system")}
          {mode === "system" && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
