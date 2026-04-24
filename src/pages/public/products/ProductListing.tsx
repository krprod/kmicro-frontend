import type { ProductsProp } from "@/core/modals/product"
import React from "react"
import ProductCard from "@/pages/public/products/components/productCard"
import WishlistToggleButton from "@/components/wishlist/WishlistToggleButton"

const ProductListing: React.FC<ProductsProp> = ({products}: ProductsProp) => {
  return (
    <div className="responsive-grid">
      {
     products && products.map((product) => (
        <ProductCard product={product}  key={product.id}>
          <WishlistToggleButton product={product}  cssClass={'absolute! z-10 top-3 right-3'}/>
          </ProductCard>
      ))
      }
    </div>
  ) //return
}

export default ProductListing
