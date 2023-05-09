import { defineStore } from "pinia";
import { Names } from "./storeName";


export const useUser = defineStore({
    id: Names.user,
    state: () => ({
        token: '213',
    }),
    getters: {
        getToken(): string {
            return this.token;
        },
    },
    actions: {
        setToken(theme: string): void {
            this.token = theme as string;
        },
    },
});
