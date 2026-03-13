import api from "@/service/config/config";
import {
  createOrderPayloadSchema,
  updateOrderPayloadSchema,
  type CreateOrderPayload,
  type UpdateOrderPayload,
} from "@/service/request/schemas";
import { url } from "@/service/url/url";

export type { CreateOrderPayload, UpdateOrderPayload };

export const ordersRequest = {
  getAll: (params?: Record<string, unknown>) =>
    api.get(url.orders.getAll, { params }),

  getById: (id: string) => api.get(url.orders.getById(id)),

  create: (data: CreateOrderPayload) =>
    api.post(url.orders.create, createOrderPayloadSchema.parse(data)),

  update: (id: string, data: UpdateOrderPayload) =>
    api.put(url.orders.update(id), updateOrderPayloadSchema.parse(data)),

  delete: (id: string) => api.delete(url.orders.delete(id)),
};
