import { Outlet } from "react-router"
import { ToastContainer, Zoom } from "react-toastify"
import PrivateLayout from "../layouts/PrivateLayout"
import ProtectedRoute from "../layouts/ProtectedRoute"

const PrivateRoutes = () => {
  return (
    <ProtectedRoute>
      <PrivateLayout>
        <ToastContainer
          stacked
          className="mt-10"
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          // theme="light"
          transition={Zoom}
        />
        <Outlet />
      </PrivateLayout>
    </ProtectedRoute>
  )
}

export default PrivateRoutes;