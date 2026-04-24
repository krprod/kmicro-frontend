const conf = {
  commonUrl: String(import.meta.env.VITE_COMMON_ENDPOINT) || "http://localhost:8085/api",
  userLocalStorageToken: String(import.meta.env.VITE_USER_LOCAL_STORAGE_TOKEN) || "kmirco_token",
  userLocalStorageUser: String(import.meta.env.VITE_USER_LOCAL_STORAGE_USER) || "kmirco_user",
}

export default conf;