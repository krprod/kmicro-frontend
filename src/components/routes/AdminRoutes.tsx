import { Outlet } from "react-router"
import PrivateLayout from "../layouts/PrivateLayout"
// import { Toaster } from "@/components/ui/sonner"
import AdminLayout from "../layouts/AdminLayout"
import { Bounce, ToastContainer } from "react-toastify"


const AdminRoutes = () => {
  return (
    <AdminLayout>
          <PrivateLayout>
                       <ToastContainer
                                stacked
                                className="mt-10"
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover={false}
                                // theme="light"
                                transition={Bounce}
                        />
{/*         <Toaster position={"top-center"} toastOptions={
                {classNames: {
                description: '!text-red-900',
                },
                 duration: 3000,
                 style: {
                                background: '#fff',
                                color: '#000',
                 },
                 closeButton: true,
                 }
        } 
        /> */}
        <Outlet />
      </PrivateLayout>
    </AdminLayout>
  )
}

export default AdminRoutes;