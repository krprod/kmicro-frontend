import { logout } from "@/stores/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
// import { toast } from "react-toastify";

type AdminLayoutProps = {
	children: ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {

        const navigate = useNavigate();
        const auth = useAppSelector((state)=> state.auth);
        const dispatch = useAppDispatch();
        
        useEffect(()=>{
                 if(!auth.isAdmin){
                        dispatch(logout());
                        navigate(-1);
                }
        },[auth, navigate, dispatch]) 
        return <>{children}</>;
};

export default AdminLayout;