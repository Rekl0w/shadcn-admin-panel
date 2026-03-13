import type { TFunction } from "i18next";

export interface TranslatedFormError {
  message: string;
}

interface FormStateLike {
  fieldMeta: Record<string, { errors?: readonly unknown[] } | undefined>;
  errors: readonly unknown[];
}

export const DEFAULT_FORM_ERROR_KEY = "validation.required";

function isNonEmptyMessage(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function extractErrorMessages(error: unknown): string[] {
  if (Array.isArray(error)) {
    return error.flatMap(extractErrorMessages);
  }

  if (isNonEmptyMessage(error)) {
    return [error];
  }

  if (error && typeof error === "object") {
    const message = Reflect.get(error, "message");

    if (isNonEmptyMessage(message)) {
      return [message];
    }

    const issues = Reflect.get(error, "issues");

    if (Array.isArray(issues)) {
      return issues.flatMap(extractErrorMessages);
    }
  }

  return [];
}

export function translateFormErrors(
  errors: readonly unknown[],
  t: TFunction,
  namespace = "common",
): TranslatedFormError[] {
  return errors.flatMap((error) =>
    extractErrorMessages(error).map((message) => ({
      message: t(message, { ns: namespace }),
    })),
  );
}

export function getFirstFormError(
  formState: FormStateLike,
  fallback = DEFAULT_FORM_ERROR_KEY,
): string {
  const fieldErrors = Object.values(formState.fieldMeta).flatMap(
    (meta) => meta?.errors ?? [],
  );

  return (
    [...fieldErrors, ...formState.errors].flatMap(extractErrorMessages)[0] ??
    fallback
  );
}

export function getFieldErrorState(
  errors: readonly unknown[],
  t: TFunction,
  isTouched: boolean,
  namespace = "common",
) {
  const translatedErrors = translateFormErrors(errors, t, namespace);

  return {
    translatedErrors,
    hasError: isTouched && translatedErrors.length > 0,
  };
}

export function toOptionalValue(value: string) {
  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

export function toTrimmedValue(value: string) {
  return value.trim();
}
