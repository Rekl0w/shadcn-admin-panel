import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field as FormField,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { GalleryVerticalEndIcon } from "@/components/ui/gallery-vertical-end";
import { useTranslation } from "react-i18next";
import {
  loginPayloadSchema,
  type LoginPayload,
} from "@/service/request/schemas";

const defaultValues = {
  email: "admin@example.com",
  password: "password",
} satisfies LoginPayload;

const validateEmail = (value: string) => {
  const validationResult = loginPayloadSchema.shape.email.safeParse(value);

  return validationResult.success
    ? undefined
    : validationResult.error.issues[0]?.message || "validation.required";
};

const validatePassword = (value: string) => {
  const validationResult = loginPayloadSchema.shape.password.safeParse(value);

  return validationResult.success
    ? undefined
    : validationResult.error.issues[0]?.message || "validation.required";
};

export default function LoginPage() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation(["login", "common"]);

  const getTranslatedErrors = (errors: readonly unknown[]) =>
    errors.flatMap((error) => {
      if (typeof error !== "string" || !error.trim()) {
        return [];
      }

      return [{ message: t(error, { ns: "common" }) }];
    });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const validationResult = loginPayloadSchema.safeParse(value);

      if (!validationResult.success) {
        const messageKey =
          validationResult.error.issues[0]?.message || "validation.required";
        toast.error(t(messageKey, { ns: "common" }));
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAuth(
        {
          id: "1",
          name: "Admin User",
          email: validationResult.data.email,
          role: "admin",
          avatar: "",
        },
        "fake-jwt-token",
      );

      toast.success(t("success"));
      navigate("/");
    },
    onSubmitInvalid: ({ formApi }) => {
      const fieldErrors = Object.values(formApi.state.fieldMeta).flatMap(
        (meta) => meta?.errors ?? [],
      );
      const firstError = [...fieldErrors, ...formApi.state.errors].find(
        (error): error is string =>
          typeof error === "string" && error.trim().length > 0,
      );

      toast.error(t(firstError ?? "validation.required", { ns: "common" }));
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon size={24} />
          </div>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <form.Field
              name="email"
              validators={{
                onBlur: ({ value }) => validateEmail(value),
                onChange: ({ value }) => validateEmail(value),
                onSubmit: ({ value }) => validateEmail(value),
              }}
            >
              {(field) => {
                const errors = getTranslatedErrors(field.state.meta.errors);
                const hasError =
                  field.state.meta.isTouched && errors.length > 0;

                return (
                  <FormField data-invalid={hasError}>
                    <FieldLabel htmlFor={field.name}>{t("email")}</FieldLabel>
                    <FieldContent>
                      <Input
                        autoComplete="email"
                        aria-invalid={hasError}
                        id={field.name}
                        name={field.name}
                        placeholder={t("emailPlaceholder")}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                      {hasError ? <FieldError errors={errors} /> : null}
                    </FieldContent>
                  </FormField>
                );
              }}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onBlur: ({ value }) => validatePassword(value),
                onChange: ({ value }) => validatePassword(value),
                onSubmit: ({ value }) => validatePassword(value),
              }}
            >
              {(field) => {
                const errors = getTranslatedErrors(field.state.meta.errors);
                const hasError =
                  field.state.meta.isTouched && errors.length > 0;

                return (
                  <FormField data-invalid={hasError}>
                    <FieldLabel htmlFor={field.name}>
                      {t("password")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        autoComplete="current-password"
                        aria-invalid={hasError}
                        id={field.name}
                        name={field.name}
                        placeholder={t("passwordPlaceholder")}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                      {hasError ? <FieldError errors={errors} /> : null}
                    </FieldContent>
                  </FormField>
                );
              }}
            </form.Field>

            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <Button type="submit" className="w-full" disabled={!canSubmit}>
                  {isSubmitting ? t("loading") : t("submit")}
                </Button>
              )}
            </form.Subscribe>
            <p className="text-center text-xs text-muted-foreground">
              {t("demo")}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
