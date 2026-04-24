import type { CartItem } from "@/core/modals/cart";
import type { Product } from "@/core/modals/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CartState{
  wishlist: Product[];
  cartItems: CartItem[];
  subtotal?: number;
  tax?: number;
  shippingFee?: number;
  total?: number;
}

const cartData = JSON.parse(localStorage.getItem('cart') || '[]');

const initialState : CartState = {
  wishlist:cartData.wishlist || [],
  cartItems: cartData.cart || [],
  subtotal: cartData.subtotal || 0,
  tax: cartData.tax || 0,
  shippingFee: cartData.shippingFee || 0,
  total: cartData.total || 0
}

function performAmoutCal(cartItems: CartItem[]){
        const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
        const tax = (parseFloat(subtotal) * 0.1).toFixed(2) // Assuming a fixed tax rate of 10%
        // const shippingCost = (cartItems.length > 0 ? 5.0 : 0).toFixed(2) // Flat shipping cost of $5 if there are
        const shippingCost = (cartItems.length > 0 ? 100.0 : 0).toFixed(2) // Flat shipping cost of $5 if there are
        const total = (
                                parseFloat(subtotal) +
                                parseFloat(tax) +
                                parseFloat(shippingCost)
                                ).toFixed(2)
        return {'subtotal': subtotal, 'tax':tax, 'shippingCost':shippingCost, 'total':total}
}

function localStorageCartUpdate(cartState: CartState | CartItem[]){
  localStorage.setItem('cart', JSON.stringify(cartState));
}

/* function removeFromWishlistOut(state, product: Product){
    const updatedWishList =  state.wishlist.filter((p) => p.id !== product.id);
      state.wishlist = updatedWishList; 
} */

const cartSlice = createSlice({
  name : 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exitingCartItem = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id);
      if (exitingCartItem !== -1) {
            state.cartItems[exitingCartItem].quantity = action.payload.quantity;
            toast.success("Updated Quantity");
          } else {
            state.cartItems.push(action.payload);
            toast.success("Added to cart");
          }
      if(state.wishlist.find((item) => item.id === action.payload.product.id)){
        const updatedWishList =  state.wishlist.filter((p) => p.id !== action.payload.product.id);
        state.wishlist = updatedWishList; 
      }
      const pricingEl = performAmoutCal(state.cartItems);
      state.shippingFee = parseFloat(pricingEl.shippingCost);
      state.tax = parseFloat(pricingEl.tax);
      state.total = parseFloat(pricingEl.total);
      state.subtotal = parseFloat(pricingEl.subtotal);
     
      localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });
//       console.log('PE1',pricingEl);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
       const updatedCartItems = state.cartItems.filter((item) => item.product.id !== action.payload.id);
       state.cartItems = updatedCartItems;
        const pricingEl = performAmoutCal(state.cartItems);
         state.shippingFee = parseFloat(pricingEl.shippingCost);
      state.tax = parseFloat(pricingEl.tax);
      state.total = parseFloat(pricingEl.total);
      state.subtotal = parseFloat(pricingEl.subtotal);
            localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });;
//       console.log('PE2',pricingEl);
    },
    setItemQuantity: (state, action: PayloadAction<CartItem>) =>{
      const Index = state.cartItems.findIndex((item) => item.product.id === action.payload.product.id);
       if (Index !== -1) {
            state.cartItems[Index].quantity =action.payload.quantity;
         const pricingEl = performAmoutCal(state.cartItems);
          state.shippingFee = parseFloat(pricingEl.shippingCost);
      state.tax = parseFloat(pricingEl.tax);
      state.total = parseFloat(pricingEl.total);
      state.subtotal = parseFloat(pricingEl.subtotal);
        // console.log('PE3',pricingEl);    
            toast.success("Product Quantity Updated");
                 localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });
          }
    },
    addToWishlist: (state, action: PayloadAction<Product>) =>{
        state.wishlist.push(action.payload);
              localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });
        toast.success("Product Added To Wishlist");
    },
    removeFromWishlist: (state, action: PayloadAction<Product>) =>{
     const updatedWishList =  state.wishlist.filter((p) => p.id !== action.payload.id);
      state.wishlist = updatedWishList; 
            localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });
       toast.success("Product Removed From Wishlist");
    },
    emptyWishlist: (state) =>{
      state.wishlist = [];
            localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });
    },
    moveToWishList: (state, action: PayloadAction<Product>) =>{
      const updatedCartItems = state.cartItems.filter((item) => item.product.id !== action.payload.id);
      if(!state.wishlist.find((item) => item.id === action.payload.id)){
            state.wishlist.push(action.payload);
      }
      state.cartItems = updatedCartItems;
      const pricingEl = performAmoutCal(state.cartItems);
       state.shippingFee = parseFloat(pricingEl.shippingCost);
      state.tax = parseFloat(pricingEl.tax);
      state.total = parseFloat(pricingEl.total);
      state.subtotal = parseFloat(pricingEl.subtotal);
              localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });
        // console.log('PE4',pricingEl);   
    },
    addAllWishListToCart: (state) => {
        state.wishlist.forEach((product)=>{
          // let outOfStockExists = false;
            const existingCartItem = state.cartItems.find((item) => item.product.id === product.id);

            if(product.inStock || existingCartItem?.product.inStock){

               if (existingCartItem) {
                existingCartItem.quantity += 1;
              // removeFromWishlist(existingCartItem.product);
                state.wishlist  =  state.wishlist.filter((p) => p.id !== existingCartItem.product.id);
              } else {
                state.cartItems.push({ product, quantity: 1 });
              // removeFromWishlist(product);
              state.wishlist  =  state.wishlist.filter((p) => p.id !== product.id);
              }
            }

        });
        const pricingEl = performAmoutCal(state.cartItems);
         state.shippingFee = parseFloat(pricingEl.shippingCost);
      state.tax = parseFloat(pricingEl.tax);
      state.total = parseFloat(pricingEl.total);
      state.subtotal = parseFloat(pricingEl.subtotal);
              localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });
        // console.log('PE5',pricingEl);   
        // state.wishlist = [];
      },
    emptyCart: (state) =>{
        state.cartItems = [];
        state.subtotal = 0;
        state.tax= 0;
        state.shippingFee= 0;
        state.total= 0;
              localStorageCartUpdate( {
        wishlist: state.wishlist,
        cartItems: state.cartItems,
        subtotal: state.subtotal,
        tax: state.tax,
        shippingFee: state.shippingFee,
        total: state.total
      });
    }
  }
});

export const {addToCart, removeFromCart, setItemQuantity, removeFromWishlist, addToWishlist, emptyWishlist, moveToWishList, addAllWishListToCart, emptyCart} = cartSlice.actions;
// export { productAdaptor };
export default cartSlice.reducer;