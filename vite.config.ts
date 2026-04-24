import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` (development, production, etc.)
  // process.cwd() tells Vite to look for .env in the root directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/api/products': {
          target: env.VITE_COMMON_ENDPOINT, // Use env directly here
          changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/api/category': {
          target: env.VITE_COMMON_ENDPOINT, // Use env directly here
          changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/api/orders': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        },        
        '/api/carts': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/api/users': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        },        
        '/api/auth': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/api/notifications': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})