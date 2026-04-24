import { baseApi } from "./baseApi";

const ENDPOINT: string = "http://localhost:8080/api/products";

const productApi2 = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAllProducts: builder.query({
            query: (param) =>({ 
                    url:    `${ENDPOINT}/paginated`,
                    params: {
                        page: param.page || 1,
                        size: param.size || 5,
                        category: param.category || '',
                        minPrice: param.minPrice || '',
                        maxPrice: param.maxPrice  || '',
                        keyword: param.keyword  || ''
                    }
                }),
            providesTags: ['Product']
            // providesTags:(result) =>  result ? [...result.map(({ id }) => ({ type: 'Product' as const, id })), 'Product']: ['Product'],
        }),
        getProduct: builder.query({
            query: (id) => `${ENDPOINT}/${id}`,
             providesTags: ['Product']
            // providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

    })//EP
});

/* export default productApi2;
export const { useGetAllProductsQuery, useGetProductQuery} = productApi2; */