import { createBrowserRouter } from "react-router"
import { lazy } from "react"
import SingleProduct from "./pages/public/products/SingleProduct"
import ProductListingLayout from "./components/layouts/ProductListing-Layout"
import WishList from "./pages/public/WishList"
import Cart from "./pages/public/Cart"
import CheckoutPage from "./pages/private/CheckoutPage"
import OrderSuccess from "./pages/private/OrderSuccess"
import SignUpFrom from "./components/forms/SignUpFrom"
import SignInForm from "./components/forms/SignInForm"
import Logout from "./components/Logout"
import Profile from "./pages/user-pages/Profile"
import Orders from "./pages/user-pages/Orders"
import EmailVerification from "./components/forms/EmailVerification"
import PrivateRoutes from "./components/routes/PrivateRoutes"
import PublicRoutes from "./components/routes/PublicRoutes"
import AdminRoutes from "./components/routes/AdminRoutes"
import AdminOrders from "./pages/admin/orders/AdminOrders"
import { AdminProductListing } from "./pages/admin/products/AdminProducts"
import Admin from "./pages/admin/Admin"
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard"

//component imports
const Unauthorized = lazy(() => import("./pages/Unauthorized"))
const Error404 = lazy(() => import("./pages/Error404"))

const  browserRouter = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/signup",
        element: <SignUpFrom />,
      },
      {
        path: "/signin",
        element: <SignInForm />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/auth/verify/:token?",
        element: <EmailVerification />,
      },
    ],
  },
  {
    path: "products/:category?",
    element: <ProductListingLayout />,
  },
  { path: "/", element: <ProductListingLayout /> },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/user/orders",
        element: <Orders />,
      },
      {
        path: "/user",
        element: <Profile />,
      },
    ],
  },
  {
    element: <AdminRoutes />,
    children: [
      {
        path: "/admin/",
        element: <Admin />,
        children: [
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "products",
            element: <AdminProductListing />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <AdminDashboard />,
          },      
          {
            path: "profile",
            element: <AdminDashboard />,
          },
          {
                path:"docs",
                element: <AdminDashboard />
          }, 
          {
                path:"notifications",
                element: <AdminDashboard />
          }
        ],
      },
    ],
  },
  { path: "/unauthorized", element: <Unauthorized /> },
  {
    path: "*",
    element: <Error404 message="" />,
  },
])
const router = browserRouter;

export default router
