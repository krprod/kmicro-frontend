import type { CartItem } from '@/core/modals/cart'
import React from 'react'
import ShowCartItemList from './ShowCartItemList'


interface CartItemListProps{
    cartItems: CartItem[]
}

const CartItemList: React.FC<CartItemListProps> = ({cartItems}: CartItemListProps) => {
  return (
    <div className='border border-gray-200 rounded-xl p-6 bg-white'>
  <h2 className="text-2xl font-bold mb-4">Cart Items ({cartItems.length})</h2>
  <div className="flex flex-col gap-6">
    {
        cartItems && cartItems.map((item) => <ShowCartItemList item={item}  key={item.product.id}/>)
    }
  </div>
</div>
  )
}

export default CartItemList