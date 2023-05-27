import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://c.ll12138.icu:8181/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/nest2001": {
        target: "http://c.ll12138.icu:2001/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/nest2001/, ""),
      },
    },
  },
});
