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
import { getFieldErrorState } from "@/lib/forms";
import {
  loginPayloadSchema,
  type LoginPayload,
} from "@/service/request/schemas";

const defaultValues = {
  email: "admin@example.com",
  password: "password",
} satisfies LoginPayload;

export default function LoginPage() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation(["login", "common"]);

  const form = useForm({
    defaultValues,
    validators: {
      onChange: loginPayloadSchema,
      onSubmit: loginPayloadSchema,
    },
    onSubmit: async ({ value }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAuth(
        {
          id: "1",
          name: "Admin User",
          email: value.email,
          role: "admin",
          avatar: "",
        },
        "fake-jwt-token",
      );

      toast.success(t("success"));
      navigate("/");
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
            <form.Field name="email">
              {(field) => {
                const { translatedErrors, hasError } = getFieldErrorState(
                  field.state.meta.errors,
                  t,
                  field.state.meta.isTouched,
                );

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
                      {hasError ? (
                        <FieldError errors={translatedErrors} />
                      ) : null}
                    </FieldContent>
                  </FormField>
                );
              }}
            </form.Field>

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
                      {hasError ? (
                        <FieldError errors={translatedErrors} />
                      ) : null}
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!canSubmit || isSubmitting}
                >
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
