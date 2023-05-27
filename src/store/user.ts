import { defineStore } from "pinia";
import { Names } from "./storeName";

import { IUserInfo } from "../views/nest/user/api/index";
export const useUser = defineStore({
  id: Names.user,
  state: () => ({
    token: "213",
    userInfo: JSON.parse(localStorage.getItem("userInfo")!) || {
      account_name: "",
      real_name: "",
      mobile: "",
      role: "",
      user_status: "",
      create_time: "",
      update_time: "",
    },
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getUserInfo(): IUserInfo {
      return this.userInfo as IUserInfo;
    },
  },
  actions: {
    setToken(theme: string): void {
      this.token = theme as string;
    },
    setUserInfo(userInfo: any): void {
      this.userInfo = userInfo;
    },
  },
});
