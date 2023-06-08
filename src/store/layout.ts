import { defineStore } from "pinia";
import { Names } from "./storeName";

export type ThemeStore = ReturnType<typeof useLayoutStore>;

export const useLayoutStore = defineStore({
  id: Names.layout,
  state: () => ({
    isCollapse: false,
    isSearch: false,
  }),
  getters: {
    getLayout(): boolean {
      return this.isCollapse;
    },
    getSearch(): boolean {
      return this.isSearch;
    },
  },
  actions: {
    setLayout(isCollapse: boolean): void {
      this.isCollapse = isCollapse as boolean;
    },
    setSearch(isSearch: boolean): void {
      this.isSearch = isSearch as boolean;
    },
  },
});
