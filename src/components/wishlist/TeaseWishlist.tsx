import React from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { AppViewCss } from '@/common/constants'
import { useDispatch } from 'react-redux'
import { addAllWishListToCart } from '@/stores/slice/cartSlice'

interface TeaseWishlistProps{
    wishlistCount: number
}

const TeaseWishlist: React.FC<TeaseWishlistProps> = ({wishlistCount}: TeaseWishlistProps) => {
    const dispatch = useDispatch();
  return (
    <div className={`${AppViewCss} flex items-center justify-between mb-4`}>
  <div className="flex items-center gap-3">
    {/* <mat-icon className="!text-red-500">favorite_border</mat-icon> */}
    <FontAwesomeIcon icon='fa-regular fa-heart' />
    <div className="text-gray-500">
      <h2 className="text-xl font-bold">Wishlist ({wishlistCount})</h2>
      <p className="text-gray-500 text-sm">
        You have {wishlistCount} items saved for later
      </p>
    </div>
  </div>
  <div className="flex items-center gap-3">
    {/* <button matButton routerLink="/wishlist">View Wishlist</button> */}
    <Link to="/wishlist">
    <Button variant='secondary' className='text-primary'>
        View Wishlist
    </Button>
    </Link>
  {/*   <button
      matButton="filled"
      className="flex items-center gap-2"
      (click)="store.addAllWishListToCart()"
    >
      <mat-icon>shopping_cart</mat-icon>
      Add All to Cart
    </button> */}
    <Button onClick={()=>{ dispatch(addAllWishListToCart()) }} className="flex items-center gap-2"  disabled={wishlistCount ===0}>
        <FontAwesomeIcon icon={faCartShopping} />
        Add All to Cart
    </Button>
  </div>
</div>
  )
}

export default TeaseWishlist