import type { OrderItemsApi } from "@/core/modals/order";
import React from 'react'
import { AccordionContent } from "../ui/accordion";

interface OrderItemProps {
        item: OrderItemsApi;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }: OrderItemProps) => (
  <div className="flex items-start gap-4 p-2">
    {/* Product Image Placeholder */}
    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
      <img 
        src={item.item_img} 
        alt={item.item_name} 
        className="h-20 w-20 object-contain" 
      />
    </div>
    
    {/* Product Details */}
    <div className="flex flex-col">
      <h4 className="font-semibold text-gray-900 leading-tight">{item.item_name} </h4>
      <p className="mt-1 text-sm text-gray-500">
        Quantity: <span className="font-medium">{item.quantity}x = USD {item.price}</span>
      </p>
  {/*     <p className="text-sm text-gray-500">Color: {item.color}</p>
      <p className="text-sm text-gray-500">Size: {item.size}</p> */}
    </div>
  </div>
);

export default OrderItem;