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
import { Textarea } from "@/components/ui/textarea";
import { getFieldErrorState } from "@/lib/forms";
import {
  emptyProductFormValues,
  getProductCategoryTranslationKey,
  getProductStatusFromStock,
  productCategoryValues,
  productFormSchema,
  toProductFormValues,
} from "@/pages/products/schema";

import type { ProductFormDialogProps } from "./types";

export function ProductFormDialog({
  mode,
  open,
  onOpenChange,
  product,
  onSubmit,
}: ProductFormDialogProps) {
  const isCreateMode = mode === "create";
  const { t } = useTranslation(["products", "common"]);
  const formId = isCreateMode ? "create-product-form" : "edit-product-form";

  const form = useForm({
    defaultValues: product
      ? toProductFormValues(product)
      : emptyProductFormValues,
    validators: {
      onChange: productFormSchema,
      onSubmit: productFormSchema,
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
      <form.Subscribe selector={(state) => state.values.stock}>
        {(stockValue) => (
          <div className="rounded-lg border border-dashed bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
            {t("dialogs.form.previewStatus", {
              status: t(
                `statuses.${getProductStatusFromStock(Number(stockValue || 0))}`,
              ),
            })}
          </div>
        )}
      </form.Subscribe>
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
        <div className="grid gap-4 md:grid-cols-2">
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

          <form.Field name="category">
            {(field) => {
              const { translatedErrors, hasError } = getFieldErrorState(
                field.state.meta.errors,
                t,
                field.state.meta.isTouched,
              );

              return (
                <FormField data-invalid={hasError}>
                  <FieldLabel htmlFor={field.name}>
                    {t("form.category")}
                  </FieldLabel>
                  <FieldContent>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value ?? "")}
                    >
                      <SelectTrigger id={field.name} aria-invalid={hasError}>
                        <SelectValue
                          placeholder={t("form.placeholders.category")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategoryValues.map((category) => (
                          <SelectItem key={category} value={category}>
                            {t(getProductCategoryTranslationKey(category))}
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

          <form.Field name="sku">
            {(field) => {
              const { translatedErrors, hasError } = getFieldErrorState(
                field.state.meta.errors,
                t,
                field.state.meta.isTouched,
              );

              return (
                <FormField data-invalid={hasError}>
                  <FieldLabel htmlFor={field.name}>{t("form.sku")}</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder={t("form.placeholders.sku")}
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

          <form.Field name="price">
            {(field) => {
              const { translatedErrors, hasError } = getFieldErrorState(
                field.state.meta.errors,
                t,
                field.state.meta.isTouched,
              );

              return (
                <FormField data-invalid={hasError}>
                  <FieldLabel htmlFor={field.name}>
                    {t("form.price")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      value={field.state.value}
                      placeholder={t("form.placeholders.price")}
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

          <form.Field name="stock">
            {(field) => {
              const { translatedErrors, hasError } = getFieldErrorState(
                field.state.meta.errors,
                t,
                field.state.meta.isTouched,
              );

              return (
                <FormField data-invalid={hasError}>
                  <FieldLabel htmlFor={field.name}>
                    {t("form.stock")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      value={field.state.value}
                      placeholder={t("form.placeholders.stock")}
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
        </div>

        <form.Field name="description">
          {(field) => {
            const { translatedErrors, hasError } = getFieldErrorState(
              field.state.meta.errors,
              t,
              field.state.meta.isTouched,
            );

            return (
              <FormField data-invalid={hasError}>
                <FieldLabel htmlFor={field.name}>
                  {t("form.description")}
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder={t("form.placeholders.description")}
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
