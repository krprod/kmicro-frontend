import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '@/stores/store'
import type { Product } from '@/core/modals/product'
import { useDispatch } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '@/stores/slice/cartSlice'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

interface WishlistToggleButtonProps{
    product: Product;
    cssClass?: string;
}

const WishlistToggleButton: React.FC<WishlistToggleButtonProps> = ({ product, cssClass } :WishlistToggleButtonProps) => {
    const dispatch = useDispatch();
    const wishList = useAppSelector((state) => state.cart.wishlist);
    const isWishListed = wishList.find((p: Product) => p.id ===product.id);

    const toggleMe = (product: Product) =>{
        if(isWishListed){
             dispatch(removeFromWishlist(product));
        }else{
            dispatch(addToWishlist(product));
        }

    }
  return (
    <span className={`${cssClass} w-10 h-10 rounded-md bg-white! border-0 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg text-gray-600` }  onClick={()=> toggleMe(product)}>
      {
        isWishListed 
        ? <FontAwesomeIcon icon={faHeartSolid} className='text-red-600' /> 
        : <FontAwesomeIcon icon={faHeart}  className='text-gray-400'/>
      }
    </span>
  )
}

export default WishlistToggleButton