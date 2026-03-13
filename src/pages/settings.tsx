import { useState } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import {
  Field as FormField,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  colorThemes,
  type ColorTheme,
  useThemeStore,
} from "@/store/theme-store";
import { useTranslation } from "react-i18next";
import { getFieldErrorState } from "@/lib/forms";

const profileFormSchema = z.object({
  name: z.string().trim().min(1, "validation.required"),
  email: z
    .string()
    .trim()
    .min(1, "validation.required")
    .email("validation.invalidEmail"),
  bio: z.string().trim(),
});

const companyFormSchema = z.object({
  companyName: z.string().trim().min(1, "validation.required"),
  website: z
    .string()
    .trim()
    .min(1, "validation.required")
    .url("validation.invalidUrl"),
});

const apiFormSchema = z.object({
  baseUrl: z
    .string()
    .trim()
    .min(1, "validation.required")
    .url("validation.invalidUrl"),
  apiKey: z.string().trim().min(1, "validation.required"),
});

const profileDefaultValues = {
  name: "Admin User",
  email: "admin@example.com",
  bio: "",
};

const companyDefaultValues = {
  companyName: "Acme Inc.",
  website: "https://acme.com",
};

const apiDefaultValues = {
  baseUrl: "http://localhost:3000/api",
  apiKey: "sk-xxxxxxxxxxxxx",
};

export default function SettingsPage() {
  const { mode, setMode, colorTheme, setColorTheme, radius, setRadius } =
    useThemeStore();
  const { t } = useTranslation(["settings", "common"]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const profileForm = useForm({
    defaultValues: profileDefaultValues,
    validators: {
      onChange: profileFormSchema,
      onSubmit: profileFormSchema,
    },
    onSubmit: () => {
      toast.success(t("toasts.profileUpdated"));
    },
  });

  const companyForm = useForm({
    defaultValues: companyDefaultValues,
    validators: {
      onChange: companyFormSchema,
      onSubmit: companyFormSchema,
    },
    onSubmit: () => {
      toast.success(t("toasts.companyUpdated"));
    },
  });

  const apiForm = useForm({
    defaultValues: apiDefaultValues,
    validators: {
      onChange: apiFormSchema,
      onSubmit: apiFormSchema,
    },
    onSubmit: () => {
      toast.success(t("toasts.apiSaved"));
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t("tabs.general")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("tabs.appearance")}</TabsTrigger>
          <TabsTrigger value="notifications">
            {t("tabs.notifications")}
          </TabsTrigger>
          <TabsTrigger value="advanced">{t("tabs.advanced")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.title")}</CardTitle>
              <CardDescription>{t("profile.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  void profileForm.handleSubmit();
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <profileForm.Field name="name">
                    {(field) => {
                      const { translatedErrors, hasError } = getFieldErrorState(
                        field.state.meta.errors,
                        t,
                        field.state.meta.isTouched,
                      );

                      return (
                        <FormField data-invalid={hasError}>
                          <FieldLabel htmlFor={field.name}>
                            {t("profile.name")}
                          </FieldLabel>
                          <FieldContent>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              placeholder={t("profile.placeholders.name")}
                              aria-invalid={hasError}
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
                  </profileForm.Field>

                  <profileForm.Field name="email">
                    {(field) => {
                      const { translatedErrors, hasError } = getFieldErrorState(
                        field.state.meta.errors,
                        t,
                        field.state.meta.isTouched,
                      );

                      return (
                        <FormField data-invalid={hasError}>
                          <FieldLabel htmlFor={field.name}>
                            {t("profile.email")}
                          </FieldLabel>
                          <FieldContent>
                            <Input
                              id={field.name}
                              name={field.name}
                              type="email"
                              value={field.state.value}
                              placeholder={t("profile.placeholders.email")}
                              aria-invalid={hasError}
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
                  </profileForm.Field>
                </div>

                <profileForm.Field name="bio">
                  {(field) => {
                    const { translatedErrors, hasError } = getFieldErrorState(
                      field.state.meta.errors,
                      t,
                      field.state.meta.isTouched,
                    );

                    return (
                      <FormField data-invalid={hasError}>
                        <FieldLabel htmlFor={field.name}>
                          {t("profile.bio")}
                        </FieldLabel>
                        <FieldContent>
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            placeholder={t("profile.bioPlaceholder")}
                            aria-invalid={hasError}
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
                </profileForm.Field>

                <profileForm.Subscribe
                  selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                  })}
                >
                  {({ canSubmit, isSubmitting }) => (
                    <Button type="submit" disabled={!canSubmit || isSubmitting}>
                      {isSubmitting
                        ? t("profile.submitting")
                        : t("actions.saveChanges", { ns: "common" })}
                    </Button>
                  )}
                </profileForm.Subscribe>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("company.title")}</CardTitle>
              <CardDescription>{t("company.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  void companyForm.handleSubmit();
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <companyForm.Field name="companyName">
                    {(field) => {
                      const { translatedErrors, hasError } = getFieldErrorState(
                        field.state.meta.errors,
                        t,
                        field.state.meta.isTouched,
                      );

                      return (
                        <FormField data-invalid={hasError}>
                          <FieldLabel htmlFor={field.name}>
                            {t("company.companyName")}
                          </FieldLabel>
                          <FieldContent>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              placeholder={t(
                                "company.placeholders.companyName",
                              )}
                              aria-invalid={hasError}
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
                  </companyForm.Field>

                  <companyForm.Field name="website">
                    {(field) => {
                      const { translatedErrors, hasError } = getFieldErrorState(
                        field.state.meta.errors,
                        t,
                        field.state.meta.isTouched,
                      );

                      return (
                        <FormField data-invalid={hasError}>
                          <FieldLabel htmlFor={field.name}>
                            {t("company.website")}
                          </FieldLabel>
                          <FieldContent>
                            <Input
                              id={field.name}
                              name={field.name}
                              type="url"
                              value={field.state.value}
                              placeholder={t("company.placeholders.website")}
                              aria-invalid={hasError}
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
                  </companyForm.Field>
                </div>

                <companyForm.Subscribe
                  selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                  })}
                >
                  {({ canSubmit, isSubmitting }) => (
                    <Button type="submit" disabled={!canSubmit || isSubmitting}>
                      {isSubmitting
                        ? t("company.submitting")
                        : t("actions.saveChanges", { ns: "common" })}
                    </Button>
                  )}
                </companyForm.Subscribe>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("theme.title")}</CardTitle>
              <CardDescription>{t("theme.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <FieldLabel>{t("theme.mode")}</FieldLabel>
                <Select
                  value={mode}
                  onValueChange={(value) =>
                    setMode(value as "light" | "dark" | "system")
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      {t("theme.light", { ns: "common" })}
                    </SelectItem>
                    <SelectItem value="dark">
                      {t("theme.dark", { ns: "common" })}
                    </SelectItem>
                    <SelectItem value="system">
                      {t("theme.system", { ns: "common" })}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <FieldLabel>{t("theme.colorTheme")}</FieldLabel>
                <div className="grid grid-cols-5 gap-3">
                  {(Object.keys(colorThemes) as ColorTheme[]).map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setColorTheme(theme)}
                      className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all hover:border-primary/50 ${
                        colorTheme === theme
                          ? "border-primary bg-primary/5"
                          : "border-muted"
                      }`}
                    >
                      <div
                        className="h-8 w-8 rounded-full"
                        style={{
                          background: colorThemes[theme].light.primary,
                        }}
                      />
                      <span className="text-xs font-medium">
                        {colorThemes[theme].label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FieldLabel>{t("theme.borderRadius")}</FieldLabel>
                  <span className="text-sm text-muted-foreground">
                    {radius.toFixed(2)}rem
                  </span>
                </div>
                <div className="flex gap-2">
                  {[0, 0.25, 0.5, 0.625, 0.75, 1.0].map((currentRadius) => (
                    <Button
                      key={currentRadius}
                      type="button"
                      variant={radius === currentRadius ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRadius(currentRadius)}
                    >
                      {currentRadius}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("notifications.title")}</CardTitle>
              <CardDescription>
                {t("notifications.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "marketing",
                  label: t("notifications.marketing"),
                  desc: t("notifications.marketingDesc"),
                },
                {
                  id: "social",
                  label: t("notifications.social"),
                  desc: t("notifications.socialDesc"),
                },
                {
                  id: "security",
                  label: t("notifications.security"),
                  desc: t("notifications.securityDesc"),
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-0.5">
                    <FieldLabel>{item.label}</FieldLabel>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.id === "security"} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("api.title")}</CardTitle>
              <CardDescription>{t("api.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  void apiForm.handleSubmit();
                }}
              >
                <apiForm.Field name="baseUrl">
                  {(field) => {
                    const { translatedErrors, hasError } = getFieldErrorState(
                      field.state.meta.errors,
                      t,
                      field.state.meta.isTouched,
                    );

                    return (
                      <FormField data-invalid={hasError}>
                        <FieldLabel htmlFor={field.name}>
                          {t("api.baseUrl")}
                        </FieldLabel>
                        <FieldContent>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            placeholder={t("api.placeholders.baseUrl")}
                            aria-invalid={hasError}
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
                </apiForm.Field>

                <apiForm.Field name="apiKey">
                  {(field) => {
                    const { translatedErrors, hasError } = getFieldErrorState(
                      field.state.meta.errors,
                      t,
                      field.state.meta.isTouched,
                    );

                    return (
                      <FormField data-invalid={hasError}>
                        <FieldLabel htmlFor={field.name}>
                          {t("api.apiKey")}
                        </FieldLabel>
                        <FieldContent>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="password"
                            value={field.state.value}
                            placeholder={t("api.placeholders.apiKey")}
                            aria-invalid={hasError}
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
                </apiForm.Field>

                <apiForm.Subscribe
                  selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                  })}
                >
                  {({ canSubmit, isSubmitting }) => (
                    <Button type="submit" disabled={!canSubmit || isSubmitting}>
                      {isSubmitting
                        ? t("api.submitting")
                        : t("actions.save", { ns: "common" })}
                    </Button>
                  )}
                </apiForm.Subscribe>
              </form>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">
                {t("danger.title")}
              </CardTitle>
              <CardDescription>{t("danger.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
                <div>
                  <p className="font-medium">{t("danger.deleteAccount")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("danger.deleteAccountDesc")}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  {t("danger.delete")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t("danger.confirmTitle")}
        description={t("danger.confirmDescription")}
        confirmLabel={t("danger.confirmAction")}
        cancelLabel={t("actions.cancel", { ns: "common" })}
        onConfirm={() => {
          setDeleteDialogOpen(false);
          toast.success(t("toasts.accountDeleted"));
        }}
      />
    </div>
  );
}
