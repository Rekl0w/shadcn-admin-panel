import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// EN
import commonEN from "./locales/en/common.json";
import sidebarEN from "./locales/en/sidebar.json";
import dashboardEN from "./locales/en/dashboard.json";
import loginEN from "./locales/en/login.json";
import usersEN from "./locales/en/users.json";
import productsEN from "./locales/en/products.json";
import ordersEN from "./locales/en/orders.json";
import settingsEN from "./locales/en/settings.json";
import analyticsEN from "./locales/en/analytics.json";

// TR
import commonTR from "./locales/tr/common.json";
import sidebarTR from "./locales/tr/sidebar.json";
import dashboardTR from "./locales/tr/dashboard.json";
import loginTR from "./locales/tr/login.json";
import usersTR from "./locales/tr/users.json";
import productsTR from "./locales/tr/products.json";
import ordersTR from "./locales/tr/orders.json";
import settingsTR from "./locales/tr/settings.json";
import analyticsTR from "./locales/tr/analytics.json";

export const defaultNS = "common";
export const resources = {
  en: {
    common: commonEN,
    sidebar: sidebarEN,
    dashboard: dashboardEN,
    login: loginEN,
    users: usersEN,
    products: productsEN,
    orders: ordersEN,
    settings: settingsEN,
    analytics: analyticsEN,
  },
  tr: {
    common: commonTR,
    sidebar: sidebarTR,
    dashboard: dashboardTR,
    login: loginTR,
    users: usersTR,
    products: productsTR,
    orders: ordersTR,
    settings: settingsTR,
    analytics: analyticsTR,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
