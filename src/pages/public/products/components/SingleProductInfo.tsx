import type { Product } from "@/core/modals/product"
import ReviewStars from "./ReviewStars"
import { CalendarSync, Shield, ShieldCheck, Truck } from "lucide-react"
import WishlistToggleButton from "@/components/wishlist/WishlistToggleButton"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCartArrowDown,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons"
import QtySelector from "@/components/cart/QtySelector"
import { useDispatch } from "react-redux"
import { addToCart } from "@/stores/slice/cartSlice"
import { useState } from "react"
// import { useAppSelector } from "@/stores/store"
import { toast } from "react-toastify"
// import { useAddToCartApiMutation } from "@/stores/api/CartApi"
// import { transformCartForApi } from "@/core/modals/cart"

interface SingleProductProps {
  product: Product
}

function SingleProductInfo({ product }: SingleProductProps) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
//   const [addToCartApi, result] = useAddToCartApiMutation()
  /*  const cartItems = useAppSelector((state)=> state.cart.cartItems);
  const ProductIndex = cartItems.findIndex((item) => item.product.id === product.id);  

      if (ProductIndex !== -1) {
            // setQty(cartItems[ProductIndex].quantity);
            console.log("qty", cartItems[ProductIndex].quantity);
      } */

/*   const handleAddToCart = (product: Product, quantity: number) => {
    addToCartApi(transformCartForApi(product, quantity, 100))
    console.log(result)
    // dispatch(addToCart({ product, quantity: qty }));
  } */

/*   useEffect(() => {
    if (result.isSuccess) {
      console.log(result)
      dispatch(addToCart({ product, quantity: qty }))
      toast.done("Added To Cart")
    }
    if (result.isError) {
      toast.error("Error Occurred")
      result.reset()
      console.log(result)
    }
  }, [result, addToCartApi, dispatch]) */

  return (
    <>
      <div className="mb-2 w-fit rounded-xl bg-gray-100 px-2 py-1 text-xs">
        {product.category}
      </div>
      <h1 className="mb-3 text-2xl font-extrabold">{product.name}</h1>
      <ReviewStars rating={product.rating || 0}>
        {product.rating} ({product.reviewCount} reviews)
      </ReviewStars>

      <p className="mb-3 text-3xl font-extrabold">$ {product.price}</p>
      {/* <app-stock-status className="mb-4" [instock]="product().inStock" /> */}
      <p className="mb-2 font-semibold">Description</p>
      <p className="border-b border-gray-200 pb-4 text-gray-600">
        {product.description}
      </p>
      <div className="mb-3 flex items-center gap-2 pt-4">
        <span className="font-semibold">Quantity:</span>
        {/* <app-qty-selector [quantity]="quantity()" (qtyUpdated)="quantity.set($event)" /> */}
        {/* <QtySelector qty={1}/> */}
        <QtySelector
          quantity={qty}
          onIncrement={() => {
            setQty((q) => q + 1)
            toast.success("Product Quantity Updated")
          }}
          onDecrement={() => {
            setQty((q) => q - 1)
            toast.success("Product Quantity Updated")
          }}
        />
      </div>
      <div className="mb flex gap-4 border-b border-gray-200 pb-2">
        <Button
          className="flex w-2/3 items-center gap-2"
          disabled={!product.inStock}
          onClick={() => {dispatch(addToCart({ product, quantity: qty }))}}
        >
          <FontAwesomeIcon icon={faCartArrowDown} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>

        <WishlistToggleButton product={product} />

        <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-0 bg-white! text-gray-600 shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg">
          <FontAwesomeIcon icon={faShareNodes} />
        </span>
      </div>
      <div className="flex flex-col gap-2 pt-6 text-xs text-gray-700">
        <div className="flex items-center gap-3">
          <Truck />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck />
          <span>Secure payment processing</span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarSync />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-3">
          <Shield />
          <span>2-year warranty included</span>
        </div>
      </div>
    </>
  )
}

export default SingleProductInfo
