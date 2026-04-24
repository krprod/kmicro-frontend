import BackButton from '@/components/BackButton'
import { emptyCart } from '@/stores/slice/cartSlice'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const OrderSuccess: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
            dispatch(emptyCart());
            setTimeout(() => {
                toast.success("Redirecting to products page...");
                navigate('/user/orders');
            }, 2000);
    },[dispatch, navigate]);

  return (
     <div className="flex justify-center items-center h-[calc(100vh-64px)] py-6">
      <div className="flex flex-col items-center justcify-center  text-center bg-white rounded-xl shadow p-8 gap-6">
        <FontAwesomeIcon icon={faCircle} className="text-green-500 h-14 w-14 text-[56px]"/>
        <h2 className="text-2xl font-semibold text-green-600 ">Order Placed Successfully!</h2>
        <p className="text-base">
          Thank you for your purchase! Your order has been confirmed and will be shipped soon.
        </p>
        <p className="text-gray-600">
          You will recieve an email confirmation with your order details and tracking information
          once your order has been shipped.
        </p>
        <BackButton path='/products' text='Continue Shopping'/>
      </div>
    </div>
  )
}

export default OrderSuccess