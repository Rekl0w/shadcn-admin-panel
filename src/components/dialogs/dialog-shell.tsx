import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const dialogShellVariants = cva("", {
  variants: {
    size: {
      sm: "sm:max-w-sm",
      md: "sm:max-w-lg",
      lg: "sm:max-w-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface DialogShellProps extends VariantProps<typeof dialogShellVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
}

interface DialogFormActionsProps {
  cancelLabel: string;
  submitLabel: string;
  submittingLabel?: string;
  formId?: string;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  cancelDisabled?: boolean;
  submitVariant?: VariantProps<typeof buttonVariants>["variant"];
}

export function DialogShell({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size,
  contentClassName,
}: DialogShellProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(dialogShellVariants({ size }), contentClassName)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
        {footer}
      </DialogContent>
    </Dialog>
  );
}

export function DialogFormActions({
  cancelLabel,
  submitLabel,
  submittingLabel,
  formId,
  isSubmitting = false,
  isSubmitDisabled = false,
  cancelDisabled = false,
  submitVariant = "default",
}: DialogFormActionsProps) {
  return (
    <DialogFooter>
      <DialogClose
        render={
          <Button type="button" variant="outline" disabled={cancelDisabled} />
        }
      >
        {cancelLabel}
      </DialogClose>
      <Button
        form={formId}
        type={formId ? "submit" : "button"}
        variant={submitVariant}
        disabled={isSubmitDisabled || isSubmitting}
      >
        {isSubmitting ? (submittingLabel ?? submitLabel) : submitLabel}
      </Button>
    </DialogFooter>
  );
}
