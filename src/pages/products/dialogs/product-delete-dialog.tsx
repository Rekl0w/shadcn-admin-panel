import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";

import type { ProductDeleteDialogProps } from "./types";

export function ProductDeleteDialog({
  open,
  onOpenChange,
  product,
  onConfirm,
}: ProductDeleteDialogProps) {
  const { t } = useTranslation(["products", "common"]);

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialogs.delete.title")}
      description={t("dialogs.delete.description", { name: product.name })}
      confirmLabel={t("dialogs.delete.confirm")}
      cancelLabel={t("actions.cancel", { ns: "common" })}
      onConfirm={onConfirm}
    />
  );
}
