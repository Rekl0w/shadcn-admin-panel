import { z } from "zod";

const validationMessages = {
  required: "validation.required",
  invalidEmail: "validation.invalidEmail",
  priceInvalid: "validation.priceInvalid",
  quantityInvalid: "validation.quantityInvalid",
  atLeastOneItem: "validation.atLeastOneItem",
} as const;

const requiredString = (message: string = validationMessages.required) =>
  z.string().trim().min(1, message);

const optionalTrimmedString = () => requiredString().optional();

const emailSchema = z
  .string()
  .trim()
  .min(1, validationMessages.required)
  .email(validationMessages.invalidEmail);

const passwordSchema = requiredString();

export const loginPayloadSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerPayloadSchema = z.object({
  name: requiredString(),
  email: emailSchema,
  password: passwordSchema,
});

export const createUserPayloadSchema = registerPayloadSchema.extend({
  role: optionalTrimmedString(),
});

export const updateUserPayloadSchema = createUserPayloadSchema.partial();

export const createProductPayloadSchema = z.object({
  name: requiredString(),
  description: optionalTrimmedString(),
  price: z.number().finite().gte(0, validationMessages.priceInvalid),
  category: optionalTrimmedString(),
  status: optionalTrimmedString(),
});

export const updateProductPayloadSchema = createProductPayloadSchema.partial();

export const orderItemSchema = z.object({
  productId: requiredString(),
  quantity: z.number().int().positive(validationMessages.quantityInvalid),
});

export const createOrderPayloadSchema = z.object({
  customer: requiredString(),
  items: z.array(orderItemSchema).min(1, validationMessages.atLeastOneItem),
  status: optionalTrimmedString(),
});

export const updateOrderPayloadSchema = createOrderPayloadSchema.partial();

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;
export type UpdateUserPayload = z.infer<typeof updateUserPayloadSchema>;
export type CreateProductPayload = z.infer<typeof createProductPayloadSchema>;
export type UpdateProductPayload = z.infer<typeof updateProductPayloadSchema>;
export type CreateOrderPayload = z.infer<typeof createOrderPayloadSchema>;
export type UpdateOrderPayload = z.infer<typeof updateOrderPayloadSchema>;
