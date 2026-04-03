import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";

import type { UserDeleteDialogProps } from "./types";

export function UserDeleteDialog({
  open,
  onOpenChange,
  user,
  onConfirm,
}: UserDeleteDialogProps) {
  const { t } = useTranslation(["users", "common"]);

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialogs.delete.title")}
      description={t("dialogs.delete.description", { name: user.name })}
      confirmLabel={t("dialogs.delete.confirm")}
      cancelLabel={t("actions.cancel", { ns: "common" })}
      onConfirm={onConfirm}
    />
  );
}