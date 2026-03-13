import type { ReactNode } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
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
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import {
  DialogFormActions,
  DialogShell,
} from "@/components/dialogs/dialog-shell";
import { getFieldErrorState } from "@/lib/forms";
import {
  createUserPayloadSchema,
  updateUserPayloadSchema,
} from "@/service/request/schemas";
import type { User } from "@/pages/users/columns";

const userRoleValues = ["admin", "editor", "viewer"] as const;

const createUserFormSchema = createUserPayloadSchema.extend({
  role: z.enum(userRoleValues),
});

const editUserFormSchema = updateUserPayloadSchema.extend({
  name: createUserPayloadSchema.shape.name,
  email: createUserPayloadSchema.shape.email,
  role: z.enum(userRoleValues),
  password: z.string(),
});

const roleVariants: Record<User["role"], "default" | "secondary" | "outline"> =
  {
    admin: "default",
    editor: "secondary",
    viewer: "outline",
  };

const statusVariants: Record<
  User["status"],
  "default" | "secondary" | "destructive"
> = {
  active: "default",
  inactive: "secondary",
  banned: "destructive",
};

const emptyUserFormValues = {
  name: "",
  email: "",
  password: "",
  role: "viewer",
} satisfies {
  name: string;
  email: string;
  password: string;
  role: User["role"];
};

export interface UserFormPayload {
  name: string;
  email: string;
  role: User["role"];
  password?: string;
}

interface UserFormDialogProps {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSubmit: (payload: UserFormPayload) => void;
}

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

interface UserDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onConfirm: () => void;
}

export function UserFormDialog({
  mode,
  open,
  onOpenChange,
  user,
  onSubmit,
}: UserFormDialogProps) {
  const isCreateMode = mode === "create";
  const { t } = useTranslation(["users", "common"]);
  const formId = isCreateMode ? "create-user-form" : "edit-user-form";

  const form = useForm({
    defaultValues: isCreateMode
      ? emptyUserFormValues
      : {
          name: user?.name ?? "",
          email: user?.email ?? "",
          password: "",
          role: user?.role ?? "viewer",
        },
    validators: {
      onChange: isCreateMode ? createUserFormSchema : editUserFormSchema,
      onSubmit: isCreateMode ? createUserFormSchema : editUserFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(
        isCreateMode
          ? value
          : {
              name: value.name,
              email: value.email,
              role: value.role,
            },
      );
      onOpenChange(false);
    },
  });

  return (
    <DialogShell
      open={open}
      onOpenChange={onOpenChange}
      title={t(isCreateMode ? "dialogs.create.title" : "dialogs.edit.title")}
      description={t(
        isCreateMode
          ? "dialogs.create.description"
          : "dialogs.edit.description",
      )}
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
              submitLabel={t(
                isCreateMode ? "dialogs.create.submit" : "dialogs.edit.submit",
              )}
              submittingLabel={t(
                isCreateMode
                  ? "dialogs.create.submitting"
                  : "dialogs.edit.submitting",
              )}
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
        <form.Field name="name">
          {(field) => {
            const { translatedErrors, hasError } = getFieldErrorState(
              field.state.meta.errors,
              t,
              field.state.meta.isTouched,
            );

            return (
              <FormField data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>{t("form.name")}</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder={t("form.placeholders.name")}
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

        <form.Field name="email">
          {(field) => {
            const { translatedErrors, hasError } = getFieldErrorState(
              field.state.meta.errors,
              t,
              field.state.meta.isTouched,
            );

            return (
              <FormField data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>{t("form.email")}</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    placeholder={t("form.placeholders.email")}
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

        {isCreateMode ? (
          <form.Field name="password">
            {(field) => {
              const { translatedErrors, hasError } = getFieldErrorState(
                field.state.meta.errors,
                t,
                field.state.meta.isTouched,
              );

              return (
                <FormField data-invalid={hasError}>
                  <FieldLabel htmlFor={field.name}>
                    {t("form.password")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      placeholder={t("form.placeholders.password")}
                      aria-invalid={hasError}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    {hasError ? <FieldError errors={translatedErrors} /> : null}
                  </FieldContent>
                </FormField>
              );
            }}
          </form.Field>
        ) : null}

        <form.Field name="role">
          {(field) => {
            const { translatedErrors, hasError } = getFieldErrorState(
              field.state.meta.errors,
              t,
              field.state.meta.isTouched,
            );

            return (
              <FormField data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>{t("form.role")}</FieldLabel>
                <FieldContent>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange((value ?? "viewer") as User["role"])
                    }
                  >
                    <SelectTrigger id={field.name} aria-invalid={hasError}>
                      <SelectValue placeholder={t("form.placeholders.role")} />
                    </SelectTrigger>
                    <SelectContent>
                      {userRoleValues.map((role) => (
                        <SelectItem key={role} value={role}>
                          {t(`roles.${role}`)}
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
      </form>
    </DialogShell>
  );
}

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
