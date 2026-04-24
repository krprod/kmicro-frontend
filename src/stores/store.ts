import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import rootReducer from "./rootReducer";
// import storage from "redux-persist/lib/storage";
// import productApi2 from "./api/productApi2";
// import productListSlice from "./slice/productListingSlice";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"], // ONLY persist the auth slice
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
    //       serializableCheck: {
    //     // Ignore redux-persist actions that use non-serializable values
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
        }).concat(), //.concat([productApi.middleware, productApi2.middleware]
});

setupListeners(store.dispatch);

// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;