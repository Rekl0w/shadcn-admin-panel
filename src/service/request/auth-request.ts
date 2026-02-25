import api from "@/service/config/config";
import { url } from "@/service/url/url";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authRequest = {
  login: (data: LoginPayload) => api.post(url.auth.login, data),

  register: (data: RegisterPayload) => api.post(url.auth.register, data),

  logout: () => api.post(url.auth.logout),

  refresh: () => api.post(url.auth.refresh),

  getMe: () => api.get(url.auth.me),
};
