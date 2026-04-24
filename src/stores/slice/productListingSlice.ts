/* import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductListingSlice {
   page: number;
    size: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    keyword?: string;
}

const initialState: ProductListingSlice = {
   page: 1,
    size: 5,
    category: '',
    keyword: '',
};

const productListingSlice = createSlice({
    name : 'productListingSlice',
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
        }
    }
});

export const { setCategory, setPage, setPageSize, setSearchQuery } = productListingSlice.actions;
export default productListingSlice.reducer;
 */