import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";

import {
  DialogFormActions,
  DialogShell,
} from "@/components/dialogs/dialog-shell";
import {
  Field as FormField,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFieldErrorState } from "@/lib/forms";
import {
  getCarrierTranslationKey,
  shipmentCarrierValues,
  toTrackShipmentFormValues,
  trackShipmentFormSchema,
} from "@/pages/orders/schema";

import type { TrackShipmentDialogProps } from "./types";

export function TrackShipmentDialog({
  open,
  onOpenChange,
  order,
  onSubmit,
}: TrackShipmentDialogProps) {
  const { t } = useTranslation(["orders", "common"]);
  const formId = `track-shipment-${order.id}`;

  const form = useForm({
    defaultValues: toTrackShipmentFormValues(order),
    validators: {
      onChange: trackShipmentFormSchema,
      onSubmit: trackShipmentFormSchema,
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
      title={t("dialogs.track.title")}
      description={t("dialogs.track.description", { id: order.id })}
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
              submitLabel={t("dialogs.track.submit")}
              submittingLabel={t("dialogs.track.submitting")}
              formId={formId}
              isSubmitDisabled={!canSubmit}
              isSubmitting={isSubmitting}
              cancelDisabled={isSubmitting}
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
        <form.Field name="carrier">
          {(field) => {
            const { translatedErrors, hasError } = getFieldErrorState(
              field.state.meta.errors,
              t,
              field.state.meta.isTouched,
            );

            return (
              <FormField data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>
                  {t("forms.carrier")}
                </FieldLabel>
                <FieldContent>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value ?? "")}
                  >
                    <SelectTrigger id={field.name} aria-invalid={hasError}>
                      <SelectValue
                        placeholder={t("forms.placeholders.carrier")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {shipmentCarrierValues.map((carrier) => (
                        <SelectItem key={carrier} value={carrier}>
                          {t(getCarrierTranslationKey(carrier))}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {hasError ? <FieldError errors={translatedErrors} /> : null}
                </FieldContent>
              </FormField>
            );
          }}
        </form.Field>

        <form.Field name="trackingNumber">
          {(field) => {
            const { translatedErrors, hasError } = getFieldErrorState(
              field.state.meta.errors,
              t,
              field.state.meta.isTouched,
            );

            return (
              <FormField data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>
                  {t("forms.trackingNumber")}
                </FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder={t("forms.placeholders.trackingNumber")}
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
      </form>
    </DialogShell>
  );
}