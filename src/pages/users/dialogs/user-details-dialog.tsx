import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DialogShell } from "@/components/dialogs/dialog-shell";

import {
  roleVariants,
  statusVariants,
  type UserDetailsDialogProps,
} from "./types";

export function UserDetailsDialog({
  open,
  onOpenChange,
  user,
}: UserDetailsDialogProps) {
  const { t } = useTranslation(["users", "common"]);

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
        <DetailItem label={t("details.userId")} value={user.id} mono />
        <DetailItem label={t("details.createdAt")} value={user.createdAt} />
        <DetailItem
          label={t("details.role")}
          value={
            <Badge variant={roleVariants[user.role]}>
              {t(`roles.${user.role}`)}
            </Badge>
          }
        />
        <DetailItem
          label={t("details.status")}
          value={
            <Badge variant={statusVariants[user.status]}>
              {t(`statuses.${user.status}`)}
            </Badge>
          }
        />
        <DetailItem label={t("details.name")} value={user.name} />
        <DetailItem label={t("details.email")} value={user.email} />
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