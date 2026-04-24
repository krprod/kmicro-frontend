const conf = {
//   appName: String(import.meta.env.VITE_APP_NAME) || "kmicroApp2",
//   orderApiUrl: String(import.meta.env.VITE_ORDER_API_URL),
//   productApiUrl: String(import.meta.env.VITE_PRODUCT_API_URL) || "http://localhost:8080/api",
//   userApiUrl: String(import.meta.env.VITE_USER_API_URL) || "http://localhost:8085/api",
  commonUrl: String(import.meta.env.VITE_COMMON_ENDPOINT) || "http://localhost:8085/api",
//   ORDER_PORT: String(import.meta.env.VITE_ORDER_PORT) || "http://localhost:8091",
//   PRODUCT_PORT: String(import.meta.env.VITE_PRODUCT_PORT) || "http://localhost:8080",
//   USER_PORT: String(import.meta.env.VITE_USER_PORT) || "http://localhost:8085",
  userLocalStorageToken: String(import.meta.env.VITE_USER_LOCAL_STORAGE_TOKEN) || "kmirco_token",
  userLocalStorageUser: String(import.meta.env.VITE_USER_LOCAL_STORAGE_USER) || "kmirco_user",
//   adminUserEmail: String(import.meta.env.VITE_ADMIN_USER_EMAIL) || "",
}

export default conf;