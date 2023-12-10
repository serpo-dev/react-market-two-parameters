import { configureStore } from "@reduxjs/toolkit";
import { listReducer } from "./listSlice";
import { productReducer } from "./productSlice";
import { cartReducer } from "./cartSlice";

export const store = configureStore({
    reducer: {
        list: listReducer,
        product: productReducer,
        cart: cartReducer,
    },
})
