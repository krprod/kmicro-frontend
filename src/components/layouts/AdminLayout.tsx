import { logout } from "@/stores/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
// import { toast } from "react-toastify";

type AdminLayoutProps = {
	children: ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
//     const isLoginToken = true; // Replace with actual authentication logic
	// const isLoginToken = useSelector(
	// 	(state: RootState) => state?.auth.user?.token
	// );
        const navigate = useNavigate();
        const auth = useAppSelector((state)=> state.auth);
        const dispatch = useAppDispatch();
        
        useEffect(()=>{
                 if(!auth.isAdmin){
                        // toast.error("Redirecting you sign in, You don't have correct roles to access this page.");
                        // setTimeout(()=>{
                        dispatch(logout());
                        navigate(-1);
                        // }, 2000);
                }
        },[auth, navigate, dispatch]) 

	// return (admin.user && admin.token) ? <>{children}</> : <Navigate to="/signin" replace />;
        return <>{children}</>;
};

export default AdminLayout;