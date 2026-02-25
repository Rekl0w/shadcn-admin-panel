import api from "@/service/config/config";
import { url } from "@/service/url/url";

export interface CreateOrderPayload {
  customer: string;
  items: Array<{ productId: string; quantity: number }>;
  status?: string;
}

export interface UpdateOrderPayload {
  customer?: string;
  items?: Array<{ productId: string; quantity: number }>;
  status?: string;
}

export const ordersRequest = {
  getAll: (params?: Record<string, unknown>) =>
    api.get(url.orders.getAll, { params }),

  getById: (id: string) => api.get(url.orders.getById(id)),

  create: (data: CreateOrderPayload) => api.post(url.orders.create, data),

  update: (id: string, data: UpdateOrderPayload) =>
    api.put(url.orders.update(id), data),

  delete: (id: string) => api.delete(url.orders.delete(id)),
};
