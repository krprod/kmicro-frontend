/* import type { Product } from "@/core/modals/product";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; */

/* interface Pagination{
    last: boolean;
    numberOfElements: number;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  }

interface QueryParam{
  category: string;
  minPrice: number;
  maxPrice: number;
  keyword: string;
  pagination: Pagination;
} */
/* export const productApi =  createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/products/'}),
    endpoints: (builder) =>({
        getAllProduct : builder.query<Product[], void>({
            query: (params: QueryParam) => `paginated?page=${params.pagination.page}&size=${params.pagination.size}`,
        })
    }),
}); */

// export const { useGetAllProductQuery } = productApi; 