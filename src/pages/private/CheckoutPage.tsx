import BackButton from "@/components/BackButton"
import PaymentOptions from "@/components/forms/PaymentOptions"
import ShippingForm from "@/components/forms/ShippingForm"
import CheckoutOrderSummary from "@/components/order-summary/CheckoutOrderSummary"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useForm, type SubmitHandler, } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { mapCheckoutFormToApiType, type CheckoutFormFieldType, type OrderApi } from "@/core/modals/order"
import { useAppDispatch, useAppSelector } from "@/stores/store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { useApi } from "@/hooks/useApi"
// import { API_ORDER_CART } from "@/common/constants"
import FullScreenLoader from "@/components/FullScreenLoader"
import { addOrder } from "@/stores/slice/orderSlice"


const schema = yup.object({
        firstName: yup.string().required().min(3).max(30),
        lastName: yup.string().required().min(3).max(30),
        contact: yup.string().matches(/^\d{9,13}$/, "Contact number must be 9-13 digits").required(),
        address: yup.string().required().min(10).max(120),
        city: yup.string().required().min(3).max(30),
        state: yup.string().required().min(3).max(30),
        zipCode:yup.string().matches(/^\d{4,10}$/, "Zip Code must be 4-10 digits").required(),
        country: yup.string().required().min(3).max(30),
        paymentOption: yup.string().required(),
        }).required();

const CheckoutPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { paymentOption: "paypal" },
  });

  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {loading, callApi} = useApi();
  const dispatch = useAppDispatch();

  const submission: SubmitHandler<CheckoutFormFieldType> = (data: CheckoutFormFieldType) => {
    ;(async function () {
      if (auth?.user && auth.token) {
        const requestData = mapCheckoutFormToApiType(data, auth?.user)
        try {
          const response = await callApi(
            "POST",
            `/api/orders/checkout/${auth?.user.id}`,
            requestData
          )

          if (response.success) {
            const orderData: OrderApi = response.data as OrderApi
            dispatch(addOrder(orderData))
            toast.success("Order placed successfully!")
            navigate("/order-success")
          } else {
            toast.error("Failed to place order. Please try again.")
          }
        } catch (error) {
          console.error("Error placing order:", error)
          toast.error(
            "An error occurred while placing the order. Please try again."
          )
        }
      } else {
        toast.error("User not authenticated. Cannot proceed with checkout.")
        navigate("/signin")
      }

      console.log("Checkout Form Process Initiated", data)
    })()
  }

  const handleCheckoutBtnClick = () => {
        // console.log("Checkout Process Initiated")
  }

  return (
    <div className="mx-auto max-w-300 py-6">
        {
                loading && (<FullScreenLoader message="Processing your request..." />)
        }
      {/* <app-back-button className="mb-4" navigateTo="/cart">Back to Cart</app-back-button> */}
      <BackButton text="Back to Cart" path="/cart">
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButton>
      <h1 className="mt-4 mb-4 text-3xl font-extrabold">Checkout</h1>
      <form onSubmit={handleSubmit(submission)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="flex flex-col gap-6 lg:col-span-3">
            {/* <app-shipping-form /> */}
            <ShippingForm regi={register} err={errors} />
            {/* <app-payment-form /> */}
            <PaymentOptions controller={control} />
          </div>
          <div className="lg:col-span-2">
            <CheckoutOrderSummary
              //   actionButton={actionButton(workOn)} cartItems={cartItems}
              btnName="Place Order"
              path="/order-success"
              handleFn={handleCheckoutBtnClick}
              checkoutItems={true}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage
