// import { ToastContainer } from "react-toastify";
import {  RouterProvider } from "react-router";
// import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
// import { lazy } from "react";
// import ProductListing from "./pages/public/ProductListing";
// import SingleProduct from "./pages/public/SingleProduct";
import router from "./router";

import { library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
// import { getWebInstrumentations, initializeFaro} from '@grafana/faro-web-sdk';

library.add(fas, far, fab);

/* 
//component imports
const PrivateLayout = lazy(() => import("./components/layouts/PrivateLayout"));
const ProtectedRoute = lazy(() => import("./components/layouts/ProtectedRoute"));
const PublicLayout = lazy(() => import("./components/layouts/PublicLayout"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const Error404 = lazy(() => import("./pages/Error404"));


const PublicRoutes = () => {
  return (
    <PublicLayout>
      <ToastContainer />
      <Outlet />
    </PublicLayout>
  );
};

const PrivateRoutes = () => {
  return (
    <ProtectedRoute>
      <PrivateLayout>
        <ToastContainer />
        <Outlet />
      </PrivateLayout>
    </ProtectedRoute>
  );
};

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/products",
        element: <ProductListing />,
      },      
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      // {
      //   path: "/signup",
      //   element: <SignupWrapper />,
      // },

    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/Dashboard",
        // element: <Dashboard />,
      },
    ],
  },
  // ❌ Unauthorized and 404 Pages
  { path: "/unauthorized", element: <Unauthorized /> },
  {
    path: "*",
    element: <Error404 />,
  },
]); */
/* const faro = initializeFaro({
  url: 'https://faro-collector.example.com/collect',
  app: {
    name: 'faro',
    version: '1.0.0',
    environment: 'production',
  },

  // Instrument specific features
  instrumentations:[
//          {
//     // Track errors automatically
//     errors: {
//       enabled: true,
//       // Ignore specific errors
//       ignoreErrors: [
//         /^Network request failed$/,
//         /^Extension context invalidated$/,
//       ],
//     },

//     // Track console logs
//     console: {
//       enabled: true,
//       level: ['error', 'warn'],
//     },

//     // Track web vitals
//     webVitals: {
//       enabled: true,
//     },

//     // Track user interactions
//     interactions: {
//       enabled: true,
//     },

//     // Track XHR and fetch requests
//     fetch: {
//       enabled: true,
//     },
//   }
  ...getWebInstrumentations(),
  ],

  // Add custom metadata
//   user: {
//     id: getCurrentUserId(),
//     attributes: {
//       plan: 'premium',
//       region: 'us-east',
//     },
//   },

  // Session configuration
//   session: {
//     // Track session duration
//     trackSession: true,
//   },

//   // Batching configuration
//   batching: {
//     enabled: true,
//     sendTimeout: 5000,  // Send every 5 seconds
//   },
});

// Track custom events
faro.api.pushEvent('checkout_completed', {
  order_id: '12345',
//   amount: 99.99,
}); */

export function App() {
  return (
  <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
