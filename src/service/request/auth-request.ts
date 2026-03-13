import api from "@/service/config/config";
import {
  loginPayloadSchema,
  registerPayloadSchema,
  type LoginPayload,
  type RegisterPayload,
} from "@/service/request/schemas";
import { url } from "@/service/url/url";

export type { LoginPayload, RegisterPayload };

export const authRequest = {
  login: (data: LoginPayload) =>
    api.post(url.auth.login, loginPayloadSchema.parse(data)),

  register: (data: RegisterPayload) =>
    api.post(url.auth.register, registerPayloadSchema.parse(data)),

  logout: () => api.post(url.auth.logout),

  refresh: () => api.post(url.auth.refresh),

  getMe: () => api.get(url.auth.me),
};
