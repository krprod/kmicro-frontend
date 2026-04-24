import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import config  from "./src/common/config"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/products': {
        target: config.productApiUrl,
        changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/orders': {
        target: config.orderApiUrl,
        changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/users': {
        target: config.userApiUrl,
        changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
