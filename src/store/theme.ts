import { defineStore } from "pinia";
import { Names } from "./storeName";

export type ThemeStore = ReturnType<typeof useThemeStore>;

export const useThemeStore = defineStore({
  id: Names.theme,
  state: () => ({
    theme: true,
  }),
  getters: {
    getTheme(): boolean {
      return this.theme;
    },
  },
  actions: {
    setTheme(theme: boolean): void {
      this.theme = theme as boolean;
    },
  },
});
