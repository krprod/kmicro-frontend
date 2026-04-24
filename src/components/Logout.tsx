import React, { useEffect, useRef, useState } from 'react'
import FullScreenLoader from './FullScreenLoader';
import { useAppDispatch } from '@/stores/store';
import { useNavigate } from 'react-router';
import { logout } from '@/stores/slice/authSlice';
import { useApi } from '@/hooks/useApi';
import { toast } from 'react-toastify';

const  Logout : React.FC = () => {
        const [loader, setLoader] = useState(true);
        const dispatch = useAppDispatch();
        const navigate = useNavigate();
        const  {callApi} = useApi();

        // 1. Use a ref to prevent double-execution in Strict Mode
    const logoutInitiated = useRef(false);

      
        useEffect(()=>{
        
                  if (logoutInitiated.current) return;
                
                  logoutInitiated.current = true;

            const performLogout = async () => {
            try {
                const response = await callApi("POST", "/api/auth/logout");
                
                if (response.success) {
                    toast.success("Logout Successful.");
                } else {
                    toast.error("Logout Failed. Session cleared locally.");
                }
            } catch (error) {
                console.error("Logout Error:", error);
            } finally {
                // 2. Clear state and redirect
                dispatch(logout());
                setLoader(false);
                navigate("/signin", { replace: true });
            }
        };
        performLogout();
            //     eslint-disable-next-line react-hooks/exhaustive-deps
},[dispatch, navigate]);

  return (
    <>
    {loader && <FullScreenLoader message='Logging you out... Please wait'/>}
    </>
  )
}

export default Logout;