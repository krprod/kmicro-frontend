// import { API_ORDER_CART } from "@/common/constants";
import OrderListing from "@/components/order-summary/OrderListing";
import type { OrderApi } from "@/core/modals/order";
import { useApi } from "@/hooks/useApi";
import { useAppSelector } from "@/stores/store"
import { useEffect, useState } from "react";

function Orders() {
        const orderState = useAppSelector((state) => state.orders);
        const authState = useAppSelector((state) => state.auth);
        const [orders, setOrders] = useState<OrderApi[]>([]);
        const {callApi} = useApi();

         

        useEffect(()=>{
                // if(orderState.orders.length === 0){
                        const fetchOrders = async () => {
                                try {
                                        const response = await callApi(
                                                "GET",
                                                `/api/orders/user/${authState?.user?.id}?withItems=true`
                                        );
                                        if(response.success){
                                                const orderData: OrderApi[] = response.data as OrderApi[];
                                                setOrders(orderData);
                                        }
                                } catch (error) {
                                        console.error("Failed to fetch orders:", error);
                                }
                        }
                        fetchOrders();
                // }
        },[orderState, setOrders, callApi, authState]);

        return (
                <div  className="mx-auto max-w-300 py-6">
                        {
                                orders.length > 0 ? (
                                        orders.map((order) => (
                                                <OrderListing order={order} key={order.id}/>
                                        ))
                                ): "No orders found."
                        }
                </div>
        )
}

export default Orders