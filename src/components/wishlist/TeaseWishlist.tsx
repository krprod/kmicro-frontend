import React from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { AppViewCss } from '@/common/constants'
import { useDispatch } from 'react-redux'
import { addAllWishListToCart } from '@/stores/slice/cartSlice'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

interface TeaseWishlistProps{
    wishlistCount: number
}

const TeaseWishlist: React.FC<TeaseWishlistProps> = ({wishlistCount}: TeaseWishlistProps) => {
    const dispatch = useDispatch();
  return (
    <div className={`${AppViewCss} flex items-center justify-between mb-4`}>
  <div className="flex items-center gap-3">
    <FontAwesomeIcon icon={faHeart} />
    <div className="text-gray-500">
      <h2 className="text-xl font-bold">Wishlist ({wishlistCount})</h2>
      <p className="text-gray-500 text-sm">
        You have {wishlistCount} items saved for later
      </p>
    </div>
  </div>
  <div className="flex items-center gap-3">

    <Link to="/wishlist">
    <Button variant='secondary' className='text-primary'>
        View Wishlist
    </Button>
    </Link>
    <Button onClick={()=>{ dispatch(addAllWishListToCart()) }} className="flex items-center gap-2"  disabled={wishlistCount ===0}>
        <FontAwesomeIcon icon={faCartShopping} />
        Add All to Cart
    </Button>
  </div>
</div>
  )
}

export default TeaseWishlist