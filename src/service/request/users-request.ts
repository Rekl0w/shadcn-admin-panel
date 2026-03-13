import api from "@/service/config/config";
import {
  createUserPayloadSchema,
  updateUserPayloadSchema,
  type CreateUserPayload,
  type UpdateUserPayload,
} from "@/service/request/schemas";
import { url } from "@/service/url/url";

export type { CreateUserPayload, UpdateUserPayload };

export const usersRequest = {
  getAll: (params?: Record<string, unknown>) =>
    api.get(url.users.getAll, { params }),

  getById: (id: string) => api.get(url.users.getById(id)),

  create: (data: CreateUserPayload) =>
    api.post(url.users.create, createUserPayloadSchema.parse(data)),

  update: (id: string, data: UpdateUserPayload) =>
    api.put(url.users.update(id), updateUserPayloadSchema.parse(data)),

  delete: (id: string) => api.delete(url.users.delete(id)),
};
