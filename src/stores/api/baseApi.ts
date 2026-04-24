import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { RootState } from '../store'; // Adjust the import path to where RootState is defined

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({

    // baseUrl: 'https://api.your-store.com/v1',

    // prepareHeaders: (headers, { getState }) => {
    //   // Logic to grab JWT from your Auth Slice
    //   const token = (getState() as RootState).auth.token;
    //   if (token) headers.set('authorization', `Bearer ${token}`);
    //   return headers;
    // },

  }),
  tagTypes: ['Product', 'Cart', 'User'], // Define tags for invalidation here
  endpoints: () => ({}), // Start with empty endpoints for code splitting
});