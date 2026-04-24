import type { CartItem } from '@/core/modals/cart'
import React from 'react'
import QtySelector from './QtySelector'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { moveToWishList, removeFromCart, setItemQuantity } from '@/stores/slice/cartSlice'
import { Link } from 'react-router'
import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'


interface ShowCartItemListProps{
    item: CartItem
}

const ShowCartItemList: React.FC<ShowCartItemListProps> = ({item}: ShowCartItemListProps) => {

    const totalPrice = (item.product.price * item.quantity).toFixed(2);
    const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-[3fr_1fr_1fr] gap-4">

  <Link to={`/product/${item.product.id}`}>
  <div className="flex items-center gap-4" >
    <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg"/>
    <div>
      <div className="text-xs text-gray-500">#ID: {item.product.id}</div>
      <div className="text-gray-900 text-lg font-semibold">{item.product.name}</div>
      <div className="text-gray-600 text-lg">${item.product.price }</div>
    </div>
  </div>
  </Link>

  <QtySelector quantity={item.quantity}
   onDecrement={()=>{dispatch(setItemQuantity({product: item.product, quantity: item.quantity - 1})) }} 
   onIncrement={()=>{dispatch(setItemQuantity({product: item.product, quantity: item.quantity + 1})) }}
   />

  <div className="flex flex-col items-end">
    <div className="text-right font-semibold text-lg">${totalPrice}</div>
    <div className="flex -me-3">
      <Button  onClick={()=>{  dispatch(moveToWishList(item.product)) }} className='mr-2'>
        <FontAwesomeIcon icon={faHeart} />
      </Button>
      <Button variant='destructive' onClick={()=>{ dispatch(removeFromCart(item.product))  }}>
      <FontAwesomeIcon icon={faTrashCan} />
      </Button>
    </div>
  </div>
</div>
  )
}

export default ShowCartItemList