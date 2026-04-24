import { AppViewCss } from "@/common/constants"
// import type { CartItem } from "@/core/modals/cart"
import { useAppSelector } from "@/stores/store"
import React from "react"
// import { Link } from "react-router"
import { Button } from "../ui/button"

interface CheckoutOrderSummaryProps {
//   cartItems: CartItem[]
//   actionButton: React.ReactNode
        btnName: string;
        handleFn: ()  => void;
        path: string;
  checkoutItems?: boolean;
}

const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
//   cartItems,
//   actionButton,
btnName, handleFn,
checkoutItems,
}: CheckoutOrderSummaryProps) => {
/*   const subtotal = cartItems
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2)
  const tax = (parseFloat(subtotal) * 0.1).toFixed(2) // Assuming a fixed tax rate of 10%
  const shippingCost = (cartItems.length > 0 ? 5.0 : 0).toFixed(2) // Flat shipping cost of $5 if there are
  const total = (
    parseFloat(subtotal) +
    parseFloat(tax) +
    parseFloat(shippingCost)
  ).toFixed(2) */

  const cart = useAppSelector((state)=> state.cart);

  return (
    <div className={`${AppViewCss}`}>
      <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>

      <div className="space-y-2 border-b pb-4">
        {/* <ng-content select="[checkoutItems]" /> */}
        {checkoutItems &&
          cart.cartItems.map((item) => (
            <div className="flex justify-between text-sm" key={item.product.id}>
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
      </div>

      <div className="space-y-3 pt-4 text-lg">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${cart.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${cart.tax}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping fee</span>
          <span>${cart.shippingFee}</span>
        </div>
        <div className="flex justify-between border-t pt-3 text-lg font-bold">
          <span>Total</span>
          <span>${cart.total}</span>
        </div>
      </div>

      {/* <ng-content select="[actionButtons]" /> */}
      {/* {actionButton} */}
      {/* <Link to={path}> */}
        <Button className="mt-6 w-full py-3" onClick={handleFn}>
          {btnName}
        </Button>
      {/* </Link> */}
    </div>
  )
}

export default CheckoutOrderSummary
