import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` (development, production, etc.)
  // process.cwd() tells Vite to look for .env in the root directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()], // visualizer({ open: true })
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
        },
        '/api/category': {
          target: env.VITE_COMMON_ENDPOINT, // Use env directly here
          changeOrigin: true,
        },
        '/api/orders': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        },        
        '/api/carts': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        },
        '/api/users': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        },        
        '/api/auth': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        },
        '/api/notifications': {
          target: env.VITE_COMMON_ENDPOINT,
          changeOrigin: true,
        },
      },
    },
    build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'ui-vendor': ['radix-ui', 'lucide-react', 'react-toastify'],
          'fontawesome': ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons']
        }
      }
    }
  }
  }
})