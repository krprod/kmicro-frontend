import {
  combineReducers,
  createAction,
  type PayloadAction,
} from "@reduxjs/toolkit";
import authReducer from "../stores/slice/authSlice";
import productReducer from "../stores/slice/productSlice";
import cartReducer from "../stores/slice/cartSlice";
import orderReducer from "../stores/slice/orderSlice";
import sarkariReducer from "../stores/slice/sarkariSlice";
import adminReducer from "../stores/slice/adminSlice";
// import { productApi } from "./api/ProductApi";
import cartApi from "./api/CartApi";
// import productListingSliceReducer from "../stores/slice/productListingSlice";


export const userLoggedOut = createAction("USER_LOGGED_OUT");

const appReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  sarkar: sarkariReducer,
  admin: adminReducer,
  [cartApi.reducerPath]: cartApi.reducer,
  // productListing: productListingSliceReducer,
  // [productApi.reducerPath]: productApi.reducer,
  // [productApi2.reducerPath]: productApi2.reducer,
});

const rootReducer = (
  state: RootState | undefined,
  action: PayloadAction<undefined>
) => {
  if (action.type === userLoggedOut.type) {
    state = {} as ReturnType<typeof appReducer>;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;
export default rootReducer;
