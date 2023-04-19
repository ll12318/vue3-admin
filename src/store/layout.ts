import { defineStore } from "pinia";
import { Names } from "./storeName";

export type ThemeStore = ReturnType<typeof useLayoutStore>;

export const useLayoutStore = defineStore({
  id: Names.layout,
  state: () => ({
    isCollapse: false,
  }),
  getters: {
    getLayout(): boolean {
      return this.isCollapse;
    },
  },
  actions: {
    setLayout(isCollapse: boolean): void {
      this.isCollapse = isCollapse as boolean;
    },
  },
});
