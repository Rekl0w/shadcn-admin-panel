const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const url = {
  auth: {
    login: `${baseURL}/auth/login`,
    register: `${baseURL}/auth/register`,
    logout: `${baseURL}/auth/logout`,
    refresh: `${baseURL}/auth/refresh`,
    me: `${baseURL}/auth/me`,
  },

  users: {
    getAll: `${baseURL}/users`,
    getById: (id: string) => `${baseURL}/users/${id}`,
    create: `${baseURL}/users`,
    update: (id: string) => `${baseURL}/users/${id}`,
    delete: (id: string) => `${baseURL}/users/${id}`,
  },

  products: {
    getAll: `${baseURL}/products`,
    getById: (id: string) => `${baseURL}/products/${id}`,
    create: `${baseURL}/products`,
    update: (id: string) => `${baseURL}/products/${id}`,
    delete: (id: string) => `${baseURL}/products/${id}`,
    categories: `${baseURL}/products/categories`,
  },

  orders: {
    getAll: `${baseURL}/orders`,
    getById: (id: string) => `${baseURL}/orders/${id}`,
    create: `${baseURL}/orders`,
    update: (id: string) => `${baseURL}/orders/${id}`,
    delete: (id: string) => `${baseURL}/orders/${id}`,
  },

  dashboard: {
    getData: `${baseURL}/dashboard`,
    analytics: `${baseURL}/dashboard/analytics`,
  },
};
