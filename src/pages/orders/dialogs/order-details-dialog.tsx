import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { DialogShell } from "@/components/dialogs/dialog-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { getCarrierTranslationKey } from "@/pages/orders/schema";

import { statusVariants, type OrderDetailsDialogProps } from "./types";

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