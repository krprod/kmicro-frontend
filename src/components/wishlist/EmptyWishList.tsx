import BackButton from '../BackButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'

function EmptyWishList() {
  return (
<div className="flex flex-col items-center justify-center py-16 text-center">
  {/* <!-- Heart Icon --> */}
  <div className="w-20 h-20 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
    {/* <mat-icon class="text-red-400 transform scale-150">favorite_border</mat-icon> */}
    <span>
      <FontAwesomeIcon icon={faHeart}  className="text-red-500 transform scale-300"/>
    </span>
  </div>
  {/* <!-- Message --> */}
  <h2 className="text-2xl font-bold mb-3 text-gray-900">Your wishlist is empty</h2>
  <p className="text-gray-600 mb-8">Looks like you haven't added anything to your wishlist yet.</p>
  {/* <!-- Start Shopping Button --> */}
  <BackButton path='/products/' text='Start Shopping'>
  <FontAwesomeIcon icon={faCartShopping} />
  </BackButton>
</div>
  )
}

export default EmptyWishList