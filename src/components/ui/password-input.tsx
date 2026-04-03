"use client";

import { EyeIcon, EyeOffIcon } from "lucide-animated";
import type { ComponentProps } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

function PasswordInput({
  className,
  disabled,
  ...props
}: ComponentProps<"input">) {
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState(false);

  const toggleLabel = isVisible
    ? t("actions.hidePassword")
    : t("actions.showPassword");

  return (
    <InputGroup
      data-disabled={disabled ? true : undefined}
      className={cn("w-full", className)}
    >
      <InputGroupInput
        disabled={disabled}
        {...props}
        type={isVisible ? "text" : "password"}
      />
      <InputGroupAddon align="inline-end" className="gap-0 pr-1">
        <InputGroupButton
          aria-label={toggleLabel}
          aria-pressed={isVisible}
          className="text-muted-foreground hover:text-foreground size-7 rounded-md"
          disabled={disabled}
          size="icon-xs"
          title={toggleLabel}
          variant="ghost"
          onClick={() => setIsVisible((current) => !current)}
          onMouseDown={(event) => event.preventDefault()}
        >
          {isVisible ? (
            <EyeIcon size={16} className="shrink-0" />
          ) : (
            <EyeOffIcon size={16} className="shrink-0" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export { PasswordInput };
