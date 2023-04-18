import { defineStore } from "pinia";
import { Names } from "./storeName";

export type ThemeStore = ReturnType<typeof useThemeStore>;

export const useThemeStore = defineStore({
  id: Names.theme,
  state: () => ({
    theme: "light",
  }),
  getters: {
    getTheme(): string {
      return this.theme;
    },
  },
  actions: {
    setTheme(theme: string): void {
      this.theme = theme as string;
    },
  },
});
