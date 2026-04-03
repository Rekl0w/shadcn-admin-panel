import { useRef, useState, type ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { EyeIcon, type EyeIconHandle } from "@/components/ui/eye";
import { EyeOffIcon, type EyeOffIconHandle } from "@/components/ui/eye-off";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends Omit<
  ComponentProps<typeof InputGroupInput>,
  "type"
> {
  inputClassName?: string;
}

export function PasswordInput({
  className,
  disabled,
  inputClassName,
  ...props
}: PasswordInputProps) {
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState(false);
  const eyeRef = useRef<EyeIconHandle>(null);
  const eyeOffRef = useRef<EyeOffIconHandle>(null);

  const toggleLabel = isVisible ? t("password.hide") : t("password.show");

  const animateActiveIcon = (visible: boolean) => {
    if (visible) {
      eyeRef.current?.stopAnimation();
      eyeOffRef.current?.startAnimation();
      return;
    }

    eyeOffRef.current?.stopAnimation();
    eyeRef.current?.startAnimation();
  };

  const handleToggle = () => {
    setIsVisible((current) => {
      const next = !current;
      requestAnimationFrame(() => animateActiveIcon(next));
      return next;
    });
  };

  const handlePointerEnter = () => {
    animateActiveIcon(isVisible);
  };

  const handlePointerLeave = () => {
    if (isVisible) {
      eyeOffRef.current?.stopAnimation();
      return;
    }

    eyeRef.current?.stopAnimation();
  };

  return (
    <InputGroup
      data-slot="password-input"
      data-visible={isVisible}
      className={cn(
        "transition-[border-color,box-shadow,background-color] duration-300 motion-reduce:duration-0",
        className,
      )}
    >
      <InputGroupInput
        {...props}
        disabled={disabled}
        type={isVisible ? "text" : "password"}
        className={cn(inputClassName)}
      />
      <InputGroupAddon align="inline-end" className="pr-2 has-[>button]:mr-0">
        <InputGroupButton
          aria-label={toggleLabel}
          aria-pressed={isVisible}
          data-state={isVisible ? "on" : "off"}
          disabled={disabled}
          size="icon-xs"
          title={toggleLabel}
          variant="ghost"
          className="relative text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-foreground data-[state=on]:text-primary motion-reduce:duration-0"
          onClick={handleToggle}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
        >
          <span className="relative size-4">
            <EyeIcon
              ref={eyeRef}
              size={16}
              className={cn(
                "pointer-events-none absolute inset-0 transition-all duration-300 motion-reduce:duration-0",
                isVisible
                  ? "scale-0 -rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100",
              )}
            />
            <EyeOffIcon
              ref={eyeOffRef}
              size={16}
              className={cn(
                "pointer-events-none absolute inset-0 transition-all duration-300 motion-reduce:duration-0",
                isVisible
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 rotate-90 opacity-0",
              )}
            />
          </span>
          <span className="sr-only">{toggleLabel}</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
