import type { OrderApi } from "@/core/modals/order"
import { ChevronDown, Download } from "lucide-react"
import React, { useMemo, useState } from "react"
import OrderItem from "./OrderItem"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button"
// import { formatShortDate, formatLongDate } from "@/lib/dateFormatterUtils";
import { formatLongDate } from "@/lib/dateFormatterUtils";
import { Separator } from "../ui/separator"
import { convertToTitleCase } from "@/lib/textUtils"
// import OrderProgressBar from "./OrderProgressBar"
// import { Link } from 'react-router'

interface OrderListingProps {
  order: OrderApi
}

const OrderListing: React.FC<OrderListingProps> = ({
  order,
}: OrderListingProps) => {

        const [value, setValue] = useState<string>("");
        // const shortDate = useMemo(() => formatShortDate(order.order_date), [order.order_date]);
        const longDate = useMemo(() => formatLongDate(order.order_date), [order.order_date]);

  return (
    <div className="mx-auto my-8 max-w-5xl overflow-hidden rounded-xl border border-gray-200 bg-white font-sans shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between border-b border-gray-100 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Order ID: {order.id}
          </h2>
          <p className="text-sm text-gray-500">
            {/* {order.orderItems.length} Products | By {order.shipping_address.name} | Ordered at: {shortDate} */}
            {order.orderItems.length} Products | By {order.shipping_address.name}
          </p>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-0">
          <Button variant="outline" 
           className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <Download size={18} />
            Download invoice
          </Button>
          {/* Toggle Button */}
          <Button 
            variant={value === "products" ? "secondary" : "default"}
            className="flex items-center gap-2 transition-all"
            onClick={() => setValue(value === "products" ? "" : "products")}
          >
            {value === "products" ? "Hide Products" : "Show Products"}
            <ChevronDown size={16} 
                className={`transition-transform duration-200 ${value === "products" ? "rotate-180" : ""}`} 
                />
          </Button>
        </div>
      </div>

      {/* Status & Shipping Info Section */}
      <div className="grid grid-cols-1 gap-4 bg-white p-6 md:grid-cols-2">
        {/* TODO: Add progress bar in the future on the tracking page */}
      {/*    <div className="col-span-2 mb-4">
                <OrderProgressBar currentStatus={order.order_status.toLocaleLowerCase()}  />
         </div> */}
        <div className="space-y-1">
          <div className="flex">
            <span className="w-32 text-gray-500">Order Status:</span>
            <span className="font-semibold text-orange-500">{convertToTitleCase(order.order_status)} </span>
          </div>
          <div className="flex">
            <span className="w-32 text-gray-500">Order At:</span>
            <span className="font-meduim text-gray-900">{longDate} </span>
          </div>
         <div className="flex pt-1">
            <span className="w-32 text-gray-500">Total:</span>
            <span className="font-bold text-gray-900">
              $ {order.total_amount}
            </span>
          </div>
        </div>
        
         <div className="space-y-1">
          <div className="flex">
            <span className="w-32 text-gray-500">Transaction ID:</span>
            <span className="font-semibold text-pink-500">{order.transaction_id}</span>
          </div>
            <div className="flex">
            <span className="w-32 text-gray-500">Payment Via:</span>
            <span className="font-medium text-primary">{convertToTitleCase(order.payment_method)}</span>
            {/* <span className="font-medium text-gray-800">{longDate}</span> */}
          </div>
          <div className="flex">
            <span className="w-32 shrink-0 text-gray-500">Payment Status:</span>
            <span className={`font-medium ${order.payment_status.toLowerCase() === "paid" ? "text-green-600" : order.payment_status.toLowerCase() === "pending" ? "text-yellow-600" : "text-red-600"}`}>
              {convertToTitleCase(order.payment_status)}
            </span>
          </div>
        </div>
      </div>


 <Separator className="col-span-2" />
          <div className="flex p-6">
            <span className="w-32 shrink-0 text-gray-500">Delivered to:</span>
            <span className="font-medium text-gray-800">
             {order.shipping_address.shipping_address}, {order.shipping_address.city}, {order.shipping_address.state}, {order.shipping_address.zip_code}, {order.shipping_address.country}
            </span>
          </div>

 <Separator className="col-span-2" />

      {/* Product Grid Section */}
      {/* Controlled Accordion for Smooth Animation */}
      <Accordion type="single" collapsible value={value} onValueChange={setValue}>
        <AccordionItem value="products" className="border-none">
          {/* We hide the default trigger because we are using our custom button in the header */}
          <AccordionTrigger className="hidden" />
          
          <AccordionContent className="p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              {order.orderItems.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default OrderListing
