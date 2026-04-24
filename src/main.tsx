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

// import { PersistGate } from "redux-persist/integration/react"

/* const faro = initializeFaro({
url: 'http://localhost:12347/collect', // Faro endpoint
app: {
name: 'faro',
version: '1.0.0',
},
  instrumentations: [
    ...getWebInstrumentations(),
    new TracingInstrumentation(), // Connects frontend clicks to backend traces
    new WebVitalsInstrumentation()
  ],
  webVitalsInstrumentation: {
    reportAllChanges: true,
  },
});
faro.api.pushLog(['React app initialized!']); */



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
