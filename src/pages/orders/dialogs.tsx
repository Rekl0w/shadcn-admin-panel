import type { ReactNode } from "react";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field as FormField,
  FieldContent,
  FieldDescription,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogFormActions,
  DialogShell,
} from "@/components/dialogs/dialog-shell";
import { getFieldErrorState } from "@/lib/forms";
import {
  createRefundFormSchema,
  getCarrierTranslationKey,
  shipmentCarrierValues,
  toRefundFormValues,
  toTrackShipmentFormValues,
  trackShipmentFormSchema,
  type Order,
  type RefundFormValues,
  type TrackShipmentFormValues,
} from "@/pages/orders/schema";

const statusVariants: Record<
  Order["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  pending: "outline",
  processing: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
}

interface TrackShipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onSubmit: (values: TrackShipmentFormValues) => void;
}

interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onSubmit: (values: RefundFormValues) => void;
}

export function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
}: OrderDetailsDialogProps) {
  const { t, i18n } = useTranslation(["orders", "common"]);
  const locale = i18n.language.startsWith("tr") ? "tr-TR" : "en-US";

  return (
    <DialogShell
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialogs.view.title")}
      description={t("dialogs.view.description")}
      footer={
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            {t("actions.close", { ns: "common" })}
          </DialogClose>
        </DialogFooter>
      }
      size="lg"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <DetailItem label={t("details.orderId")} value={order.id} mono />
        <DetailItem label={t("details.createdAt")} value={order.createdAt} />
        <DetailItem label={t("details.customer")} value={order.customer} />
        <DetailItem label={t("details.email")} value={order.email} />
        <DetailItem label={t("details.items")} value={order.items} />
        <DetailItem
          label={t("details.total")}
          value={new Intl.NumberFormat(locale, {
            style: "currency",
            currency: "USD",
          }).format(order.total)}
        />
        <DetailItem
          label={t("details.status")}
          value={
            <Badge variant={statusVariants[order.status]}>
              {t(`statuses.${order.status}`)}
            </Badge>
          }
        />
        <DetailItem
          label={t("details.carrier")}
          value={
            order.carrier
              ? t(getCarrierTranslationKey(order.carrier))
              : t("details.notAvailable")
          }
        />
        <DetailItem
          label={t("details.trackingNumber")}
          value={order.trackingNumber || t("details.notAvailable")}
          mono
        />
        <DetailItem
          label={t("details.refundAmount")}
          value={
            typeof order.refundAmount === "number"
              ? new Intl.NumberFormat(locale, {
                  style: "currency",
                  currency: "USD",
                }).format(order.refundAmount)
              : t("details.notAvailable")
          }
        />
        <DetailItem
          label={t("details.refundedAt")}
          value={order.refundedAt || t("details.notAvailable")}
        />
        <DetailItem
          label={t("details.refundReason")}
          value={order.refundReason || t("details.notAvailable")}
        />
      </div>
    </DialogShell>
  );
}

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

function DetailItem({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="space-y-1 rounded-lg border p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className={mono ? "font-mono text-sm" : "text-sm font-medium"}>
        {value}
      </div>
    </div>
  );
}
