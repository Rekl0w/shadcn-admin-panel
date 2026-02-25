import api from "@/service/config/config";
import { url } from "@/service/url/url";

export const dashboardRequest = {
  getData: (params?: Record<string, unknown>) =>
    api.get(url.dashboard.getData, { params }),

  getAnalytics: (params?: Record<string, unknown>) =>
    api.get(url.dashboard.analytics, { params }),
};
