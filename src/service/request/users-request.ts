import api from "@/service/config/config";
import { url } from "@/service/url/url";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export const usersRequest = {
  getAll: (params?: Record<string, unknown>) =>
    api.get(url.users.getAll, { params }),

  getById: (id: string) => api.get(url.users.getById(id)),

  create: (data: CreateUserPayload) => api.post(url.users.create, data),

  update: (id: string, data: UpdateUserPayload) =>
    api.put(url.users.update(id), data),

  delete: (id: string) => api.delete(url.users.delete(id)),
};
