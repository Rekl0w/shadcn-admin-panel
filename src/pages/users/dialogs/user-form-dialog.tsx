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
import { PasswordInput } from "@/components/ui/password-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFieldErrorState } from "@/lib/forms";

import {
  createUserFormSchema,
  editUserFormSchema,
  emptyUserFormValues,
  userRoleValues,
  type UserFormDialogProps,
} from "./types";

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
                    <PasswordInput
                      id={field.name}
                      name={field.name}
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
                      field.handleChange((value ?? "viewer") as typeof field.state.value)
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