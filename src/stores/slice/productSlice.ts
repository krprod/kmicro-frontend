// import productData from "@/common/product-data";
import type { Product } from "@/core/modals/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
   page: number;
    size: number;
    category: string;
    minPrice?: number;
    maxPrice?: number;
    keyword: string;
    // sortBy: 'price-low' | 'price-high' | 'rating' | 'none';
    products : Product[];
}

const initialState: ProductState = {
   page: 1,
    size: 5,
    category: "All",
    keyword: '',
    products : []
//     products : productData
};

const productSlice = createSlice({
  name : 'productSlice',
  initialState,
  reducers: {
   setSearchQuery: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
              state.category = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) =>{
             state.page = action.payload;
      },
    setPageSize: (state, action: PayloadAction<number>) =>{
             state.size = action.payload;
    },
    setProducts : (state, action) => {
        state.products = action.payload;
    }
  }
});

export const { setCategory, setPage, setPageSize, setSearchQuery, setProducts } = productSlice.actions;
export default productSlice.reducer;
