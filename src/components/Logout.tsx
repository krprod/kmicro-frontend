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

        
        // if(response.success){
        //                                 dispatch(logout());
        //                                 toast.success("Logout Successfull.")
        //                         }

        //                         if(!response.success || response.error){
        //                                 console.log("Logout Failed Response: ", response);
        //                                   dispatch(logout());
        //                                         toast.error("Logout Failed. Please try again.")
        //                         }
        //                         setLoader(false);
                        // }

        // useEffect(()=>{
        //         ;(

        //         )();
            
        //         return () => {
        //                 setLoader(false);
        //         }
        // },[dispatch, navigate, callApi]);

  return (
    <>
    {loader && <FullScreenLoader message='Logging you out... Please wait'/>}
    </>
  )
}

export default Logout


/* {auth:{user:{url:http://demo.lagrangedata.ai/api/v2/common/users/caeaecd6-e005-4b18-9cee-09a2e975a0ae/,id:caeaecd6-e005-4b18-9cee-09a2e975a0ae,email:bharati.v@dwaith.com,first_name:bharti,last_name:verma,is_active:true,is_staff:false,date_joined:2025-11-19T01:46:37.612509Z,last_login:2025-12-09T11:19:53.990075Z,groups:[],created_at:2025-11-19T01:46:37.612522Z,updated_at:2025-11-19T01:46:37.993021Z,created_by:null,updated_by:null},token:cb96ab006b5d7be69da10503f656e3536d95acbb,isAuthenticated:true},_persist:{version:-1,rehydrated:true}} */