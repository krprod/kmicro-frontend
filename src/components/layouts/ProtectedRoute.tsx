import { logout } from '@/stores/slice/authSlice';
import { useAppDispatch, useAppSelector } from '@/stores/store';
import { useEffect, type ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'react-toastify';


type ProtectedRouteProps = {
	children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//     const isLoginToken = true; // Replace with actual authentication logic
	// const isLoginToken = useSelector(
	// 	(state: RootState) => state?.auth.user?.token
	// );
        const navigate = useNavigate();
        const auth = useAppSelector((state)=> state.auth);
        const dispatch = useAppDispatch();
        
        useEffect(()=>{
                if(!auth.user && !auth.token){
                        toast.error("You need to be signed in to access this page.");
                        dispatch(logout());
                        navigate("/signin");
                }
        },[auth, navigate, dispatch])

	return (auth.user && auth.token) ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
