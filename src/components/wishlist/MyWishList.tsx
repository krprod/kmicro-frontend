import type { Product } from '@/core/modals/product'
import React from 'react'
import BackButton from '../BackButton'
import { Button } from '../ui/button'
import ProductCard from '@/pages/public/products/components/productCard'
import WishlistToggleButton from './WishlistToggleButton'
import { useDispatch } from 'react-redux'
import { emptyWishlist } from '@/stores/slice/cartSlice'

interface MyWishListProps{
    products?: Product[]
}

const MyWishList: React.FC<MyWishListProps> = ({products}: MyWishListProps) => {
    const dispatch = useDispatch();

  return (
    <div className="max-w-300 mx-auto py-6 px-4">
  <BackButton text='Back To Product Listing' path='/products/' />

    <div className="flex justify-between items-center mb-6 mt-6">
      <h1 className="text-2xl font-bold">My Wishlist</h1>
      <span className="text-xl text-gray-500">{products?.length} items</span>
    </div>
    <div className="responsive-grid">
        {
            products && products.map((product) =>(
                    <ProductCard product={product}  key={product.id}>
                        <WishlistToggleButton product={product} cssClass={'absolute! z-10 top-3 right-3'}/>
                    </ProductCard> 
            ))
        }
    </div>
    <div className="mt-8 flex justify-center">
      <Button variant='destructive' onClick={()=>{ dispatch(emptyWishlist()) }}>
        Clear Wishlist
      </Button>
    </div>
  
</div>
  );
}

export default MyWishList