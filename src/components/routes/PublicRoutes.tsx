import { Outlet } from "react-router"
import { Bounce, ToastContainer } from "react-toastify"
import PublicLayout from "../layouts/PublicLayout"
import { Toaster } from "@/components/ui/sonner"

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <ToastContainer
        stacked
        className="mt-10"
        position="top-center"
        autoClose={3000}
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
      <Toaster
                expand={true}
                richColors 
                closeButton
                toastOptions={{
                        unstyled: true,
                        classNames: {
                        toast: "!group !toast bg-background !text-foreground !border-border !flex !items-center !p-4 !rounded-xl !border !shadow-lg !gap-3",
                        title: "!text-md !font-semibold text-primary uppercase",
                        description: "!text-xs !text-muted-foreground",
                        actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground text-xs font-medium h-8 px-3 rounded-md",
                        cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground text-xs font-medium h-8 px-3 rounded-md",
                        closeButton: "absolute top-2 right-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border-border bg-background",
                        // Adding specific color overrides for richColors
                        success: "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900",
                        error: "text-destructive bg-destructive/5 border-destructive/20",
                        info: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
                        },
                }}
      />
      <Outlet />
    </PublicLayout>
  )
}

export default PublicRoutes;