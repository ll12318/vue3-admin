import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入Unocss
import Unocss from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss({
      // 使用Unocss
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: "::", // 监听所有可用的IPv6地址
    proxy: {
      "/api": {
        target: "http://c.ll12138.icu:8181/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/nest2001": {
        target: "http://c.ll12138.icu:2001/",
        // target: "http://localhost:2001/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/nest2001/, ""),
      },

      "/aida64":{
        target: "http://192.168.1.12:8000/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    },
  },
});
