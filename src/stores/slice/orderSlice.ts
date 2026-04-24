import type { OrderApi } from "@/core/modals/order";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface OrderState{
  orders: OrderApi[]
}

const initialState : OrderState = {
  orders:[]  
}


const orderSlice = createSlice({
    name : 'orderSlice',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderApi>) =>{
        state.orders.push(action.payload);
    }
  }
});


export const {addOrder} = orderSlice.actions;
export default orderSlice.reducer;