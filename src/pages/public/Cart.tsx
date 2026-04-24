import BackButton from "@/components/BackButton"
import CartItemList from "@/components/cart/CartItemList"
import CheckoutOrderSummary from "@/components/order-summary/CheckoutOrderSummary"
import TeaseWishlist from "@/components/wishlist/TeaseWishlist"
import { useAppSelector } from "@/stores/store"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  transformAllCartItemForApi,
  transformCartItemsForProductApi,
  type CartItemApi,
  type productQtyCheckResponse,
} from "@/core/modals/cart"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useApi } from "@/hooks/useApi"
import { useState } from "react"
import FullScreenLoader from "@/components/FullScreenLoader"
import { toast as Sonnu} from "sonner"

const Cart: React.FC = () => {
  const cart = useAppSelector((state) => state.cart)
  const auth = useAppSelector((state) => state.auth)
  const [requested, setRequested] = useState(false)
  const navigate = useNavigate()
  const { callApi } = useApi()
  const cartItems = cart.cartItems
  const wishlist = cart.wishlist

  const handleCart = async () => {
    if (auth.user && auth.token) {
        if (cartItems.length === 0) {
          toast.info("Your cart is empty. Please add items to proceed to checkout.")
          return
        }
      const cartProducts: CartItemApi[] = transformAllCartItemForApi(
        cartItems,
        auth.user.id
      )

      if(cartProducts.length !== 0){
        setRequested(true)
        const productQtyCheckData = transformCartItemsForProductApi(cartProducts);
        const productResponse = await callApi("POST", `/api/products/qty-check`, productQtyCheckData);
                if(!productResponse.success){
                        toast.error("Something went wrong in products");
                        console.error(productResponse);
                        setRequested(false);
                        return;
                }
                if(productResponse.success){
                        const productData = productResponse.data as productQtyCheckResponse;
                        if(productData.errors.length !== 0){
             
                                         const errorMap = productData.errors.map((p)=>{
                                                return <p key={p.id} className="text-red-500 font-semibold text-md">{`${p.message}`}</p>
                                                
                                        });
                                        console.log(errorMap);
                                        Sonnu("Issue with Product",{description: errorMap, position: "top-center" });
                                      
                                        setRequested(false);
                                        return;
                        }
                        const cartResponse = await callApi("PUT", `/api/carts/bulk-add-update`, cartProducts);
                        if(!cartResponse.success || cartResponse.error){
                                const err = cartResponse.error;
                                toast.error("Error Occurred While Updating Cart")
                                console.error("Cart Update Error:", err)
                                setRequested(false);
                                return;
                        }
                        if (cartResponse.success) {
                                toast.success("Cart Updated Successfully")
                                navigate("/checkout")
                                setRequested(false);
                        }
                }
        }
      return;
    }
    toast.error("Please Sign In To Proceed To Checkout")
    navigate("/signup")
  }

  return (
    <>
      {requested && <FullScreenLoader message="Processing your request..." />}
      <div className="mx-auto max-w-300 py-6">
        <BackButton text=" Continue Shopping" path="/products/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <h1 className="mt-6 mb-4 text-3xl font-extrabold">Shopping Cart</h1>

        <TeaseWishlist wishlistCount={wishlist.length} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartItemList cartItems={cartItems} />
          </div>

          <div>                
            <CheckoutOrderSummary
              btnName="Proceed to Checkout"
              path="/checkout"
              handleFn={handleCart}
              checkoutItems={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
