import { z } from "zod";
import {
  createProductPayloadSchema,
  type CreateProductPayload,
} from "@/service/request/schemas";
import { toOptionalValue } from "@/lib/forms";

export const productCategoryValues = [
  "Electronics",
  "Clothing",
  "Sports",
  "Home",
] as const;

export const productStatusValues = [
  "in-stock",
  "low-stock",
  "out-of-stock",
] as const;

export type ProductCategory = (typeof productCategoryValues)[number];
export type ProductStatus = (typeof productStatusValues)[number];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
  sku: string;
  description?: string;
}

export const productFormSchema = z.object({
  name: createProductPayloadSchema.shape.name,
  category: z
    .string()
    .trim()
    .min(1, "validation.required")
    .refine(
      (value) => productCategoryValues.includes(value as ProductCategory),
      "validation.required",
    ),
  price: z
    .string()
    .trim()
    .min(1, "validation.required")
    .refine((value) => {
      const parsedValue = Number(value);
      return Number.isFinite(parsedValue) && parsedValue >= 0;
    }, "validation.priceInvalid"),
  stock: z
    .string()
    .trim()
    .min(1, "validation.required")
    .refine((value) => {
      const parsedValue = Number(value);
      return Number.isInteger(parsedValue) && parsedValue >= 0;
    }, "validation.stockInvalid"),
  sku: z.string().trim().min(1, "validation.required"),
  description: z.string().trim(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const emptyProductFormValues: ProductFormValues = {
  name: "",
  category: "",
  price: "",
  stock: "",
  sku: "",
  description: "",
};

export function getProductStatusFromStock(stock: number): ProductStatus {
  if (stock <= 0) {
    return "out-of-stock";
  }

  if (stock <= 10) {
    return "low-stock";
  }

  return "in-stock";
}

export function getProductCategoryTranslationKey(category: ProductCategory) {
  return {
    Electronics: "filters.electronics",
    Clothing: "filters.clothing",
    Sports: "filters.sports",
    Home: "filters.home",
  }[category];
}

export function toProductFormValues(product?: Product): ProductFormValues {
  if (!product) {
    return emptyProductFormValues;
  }

  return {
    name: product.name,
    category: product.category,
    price: product.price.toString(),
    stock: product.stock.toString(),
    sku: product.sku,
    description: product.description ?? "",
  };
}

export function toProductRequestPayload(
  values: ProductFormValues,
): CreateProductPayload {
  const stock = Number(values.stock);

  return createProductPayloadSchema.parse({
    name: values.name.trim(),
    description: toOptionalValue(values.description),
    price: Number(values.price),
    category: values.category.trim(),
    status: getProductStatusFromStock(stock),
  });
}

export function toProductViewModel(
  id: string,
  values: ProductFormValues,
): Product {
  const requestPayload = toProductRequestPayload(values);
  const stock = Number(values.stock);

  return {
    id,
    name: requestPayload.name,
    category: values.category.trim() as ProductCategory,
    price: requestPayload.price,
    stock,
    status: getProductStatusFromStock(stock),
    sku: values.sku.trim().toUpperCase(),
    description: requestPayload.description,
  };
}
