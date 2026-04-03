import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { DialogShell } from "@/components/dialogs/dialog-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { getProductCategoryTranslationKey } from "@/pages/products/schema";

import { statusVariants, type ProductDetailsDialogProps } from "./types";

export function ProductDetailsDialog({
  open,
  onOpenChange,
  product,
}: ProductDetailsDialogProps) {
  const { t, i18n } = useTranslation(["products", "common"]);
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
    >
      <div className="grid gap-4 md:grid-cols-2">
        <DetailItem label={t("details.productId")} value={product.id} mono />
        <DetailItem label={t("details.sku")} value={product.sku} mono />
        <DetailItem label={t("details.name")} value={product.name} />
        <DetailItem
          label={t("details.category")}
          value={t(getProductCategoryTranslationKey(product.category))}
        />
        <DetailItem
          label={t("details.price")}
          value={new Intl.NumberFormat(locale, {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        />
        <DetailItem label={t("details.stock")} value={product.stock} />
        <DetailItem
          label={t("details.status")}
          value={
            <Badge variant={statusVariants[product.status]}>
              {t(`statuses.${product.status}`)}
            </Badge>
          }
        />
        <DetailItem
          label={t("details.description")}
          value={product.description || t("details.noDescription")}
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
