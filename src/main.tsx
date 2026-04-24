import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
// import { ThemeProvider } from "@/components/theme-provider.tsx"
import ErrorBoundary from "./components/layouts/ErrorBoundary.tsx"
import FallbackLoading from "./components/FallbackLoading.tsx"
// import { persistor, store } from "./stores/store.ts"
import { store } from "./stores/store.ts"
import { Provider } from "react-redux"


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ThemeProvider> */}
      <Provider store={store}>
      {/* <PersistGate loading={<FallbackLoading/>} persistor={persistor}> */}
      <Suspense fallback={<FallbackLoading/>}>
      <ErrorBoundary>
       <App />
      </ErrorBoundary>
      </Suspense>
        {/* </PersistGate> */}
        </Provider>
    {/* </ThemeProvider> */}
  </StrictMode>
)
