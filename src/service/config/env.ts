import { z } from "zod";

const DEFAULT_API_URL = "http://localhost:3000/api";

const envSchema = z.object({
  VITE_API_URL: z.preprocess((value: unknown) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmedValue = value.trim();
    return trimmedValue.length > 0 ? trimmedValue : undefined;
  }, z.string().url("VITE_API_URL must be a valid absolute URL.").default(DEFAULT_API_URL)),
});

const parsedEnv = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
});

if (!parsedEnv.success) {
  const issue = parsedEnv.error.issues[0];
  const fieldName = issue?.path.join(".") || "VITE_API_URL";
  const message = issue?.message || "Invalid environment configuration.";

  throw new Error(
    `Invalid environment configuration for ${fieldName}: ${message}`,
  );
}

export const env = parsedEnv.data;
export const apiBaseUrl = env.VITE_API_URL;
