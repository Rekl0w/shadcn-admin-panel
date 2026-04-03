import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";

import {
  DialogFormActions,
  DialogShell,
} from "@/components/dialogs/dialog-shell";
import {
  Field as FormField,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getFieldErrorState } from "@/lib/forms";
import {
  createRefundFormSchema,
  toRefundFormValues,
} from "@/pages/orders/schema";

import type { RefundDialogProps } from "./types";

export function RefundDialog({
  open,
  onOpenChange,
  order,
  onSubmit,
}: RefundDialogProps) {
  const { t } = useTranslation(["orders", "common"]);
  const formId = `process-refund-${order.id}`;
  const refundFormSchema = createRefundFormSchema(order.total);

  const form = useForm({
    defaultValues: toRefundFormValues(order),
    validators: {
      onChange: refundFormSchema,
      onSubmit: refundFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
      onOpenChange(false);
    },
  });

  return (
    <DialogShell
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialogs.refund.title")}
      description={t("dialogs.refund.description", { id: order.id })}
      footer={
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting }) => (
            <DialogFormActions
              cancelLabel={t("actions.cancel", { ns: "common" })}
              submitLabel={t("dialogs.refund.submit")}
              submittingLabel={t("dialogs.refund.submitting")}
              formId={formId}
              isSubmitDisabled={!canSubmit}
              isSubmitting={isSubmitting}
              cancelDisabled={isSubmitting}
              submitVariant="destructive"
            />
          )}
        </form.Subscribe>
      }
    >
      <form
        id={formId}
        className="grid gap-4"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field name="amount">
          {(field) => {
            const { translatedErrors, hasError } = getFieldErrorState(
              field.state.meta.errors,
              t,
              field.state.meta.isTouched,
            );

            return (
              <FormField data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>
                  {t("forms.amount")}
                </FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode="decimal"
                    min="0.01"
                    max={order.total.toString()}
                    step="0.01"
                    value={field.state.value}
                    placeholder={t("forms.placeholders.amount")}
                    aria-invalid={hasError}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {hasError ? <FieldError errors={translatedErrors} /> : null}
                </FieldContent>
              </FormField>
            );
          }}
        </form.Field>

        <form.Field name="reason">
          {(field) => {
            const { translatedErrors, hasError } = getFieldErrorState(
              field.state.meta.errors,
              t,
              field.state.meta.isTouched,
            );

            return (
              <FormField data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>
                  {t("forms.reason")}
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder={t("forms.placeholders.reason")}
                    aria-invalid={hasError}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {hasError ? <FieldError errors={translatedErrors} /> : null}
                </FieldContent>
              </FormField>
            );
          }}
        </form.Field>

        <form.Field name="restock">
          {(field) => (
            <FormField
              orientation="horizontal"
              className="items-center rounded-lg border p-3"
            >
              <FieldContent className="gap-1">
                <FieldLabel htmlFor={field.name}>
                  {t("forms.restock")}
                </FieldLabel>
                <FieldDescription>
                  {t("forms.restockDescription")}
                </FieldDescription>
              </FieldContent>
              <Switch
                id={field.name}
                checked={field.state.value}
                onCheckedChange={field.handleChange}
              />
            </FormField>
          )}
        </form.Field>
      </form>
    </DialogShell>
  );
}