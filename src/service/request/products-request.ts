import api from "@/service/config/config";
import {
  createProductPayloadSchema,
  updateProductPayloadSchema,
  type CreateProductPayload,
  type UpdateProductPayload,
} from "@/service/request/schemas";
import { url } from "@/service/url/url";

export type { CreateProductPayload, UpdateProductPayload };

export const productsRequest = {
  getAll: (params?: Record<string, unknown>) =>
    api.get(url.products.getAll, { params }),

  getById: (id: string) => api.get(url.products.getById(id)),

  create: (data: CreateProductPayload) =>
    api.post(url.products.create, createProductPayloadSchema.parse(data)),

  update: (id: string, data: UpdateProductPayload) =>
    api.put(url.products.update(id), updateProductPayloadSchema.parse(data)),

  delete: (id: string) => api.delete(url.products.delete(id)),

  getCategories: () => api.get(url.products.categories),
};
