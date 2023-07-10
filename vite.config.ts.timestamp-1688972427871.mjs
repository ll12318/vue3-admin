// vite.config.ts
import { defineConfig } from "file:///C:/Users/11759/Desktop/web/vue3_admin/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/11759/Desktop/web/vue3_admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Unocss from "file:///C:/Users/11759/Desktop/web/vue3_admin/node_modules/unocss/dist/vite.mjs";
import { presetUno, presetAttributify, presetIcons } from "file:///C:/Users/11759/Desktop/web/vue3_admin/node_modules/unocss/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    Unocss({
      // 使用Unocss
      presets: [presetUno(), presetAttributify(), presetIcons()]
    }),
    vue()
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  server: {
    host: "::",
    // 监听所有可用的IPv6地址
    proxy: {
      "/api": {
        target: "http://c.ll12138.icu:8181/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      "/nest2001": {
        target: "http://c.ll12138.icu:2001/",
        // target: "http://localhost:2001/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/nest2001/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxMTc1OVxcXFxEZXNrdG9wXFxcXHdlYlxcXFx2dWUzX2FkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxMTc1OVxcXFxEZXNrdG9wXFxcXHdlYlxcXFx2dWUzX2FkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8xMTc1OS9EZXNrdG9wL3dlYi92dWUzX2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbi8vIFx1NUYxNVx1NTE2NVVub2Nzc1xyXG5pbXBvcnQgVW5vY3NzIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xyXG5pbXBvcnQgeyBwcmVzZXRVbm8sIHByZXNldEF0dHJpYnV0aWZ5LCBwcmVzZXRJY29ucyB9IGZyb20gXCJ1bm9jc3NcIjtcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICBVbm9jc3Moe1xyXG4gICAgICAvLyBcdTRGN0ZcdTc1MjhVbm9jc3NcclxuICAgICAgcHJlc2V0czogW3ByZXNldFVubygpLCBwcmVzZXRBdHRyaWJ1dGlmeSgpLCBwcmVzZXRJY29ucygpXSxcclxuICAgIH0pLFxyXG4gICAgdnVlKCksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogXCIvc3JjXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsIC8vIFx1NzZEMVx1NTQyQ1x1NjI0MFx1NjcwOVx1NTNFRlx1NzUyOFx1NzY4NElQdjZcdTU3MzBcdTU3NDBcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9jLmxsMTIxMzguaWN1OjgxODEvXCIsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxyXG4gICAgICB9LFxyXG4gICAgICBcIi9uZXN0MjAwMVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9jLmxsMTIxMzguaWN1OjIwMDEvXCIsXHJcbiAgICAgICAgLy8gdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MjAwMS9cIixcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvbmVzdDIwMDEvLCBcIlwiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsU0FBUyxvQkFBb0I7QUFDMVUsT0FBTyxTQUFTO0FBRWhCLE9BQU8sWUFBWTtBQUNuQixTQUFTLFdBQVcsbUJBQW1CLG1CQUFtQjtBQUUxRCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLFNBQVMsQ0FBQyxVQUFVLEdBQUcsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO0FBQUEsSUFDM0QsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLEVBQ047QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxNQUNBLGFBQWE7QUFBQSxRQUNYLFFBQVE7QUFBQTtBQUFBLFFBRVIsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLGVBQWUsRUFBRTtBQUFBLE1BQ25EO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
