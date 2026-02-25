import api from "@/service/config/config";
import { url } from "@/service/url/url";

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  category?: string;
  status?: string;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  status?: string;
}

export const productsRequest = {
  getAll: (params?: Record<string, unknown>) =>
    api.get(url.products.getAll, { params }),

  getById: (id: string) => api.get(url.products.getById(id)),

  create: (data: CreateProductPayload) => api.post(url.products.create, data),

  update: (id: string, data: UpdateProductPayload) =>
    api.put(url.products.update(id), data),

  delete: (id: string) => api.delete(url.products.delete(id)),

  getCategories: () => api.get(url.products.categories),
};
