import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
    id: null,
    name: null,
    colors: [],
    curColor: 0,
    curSize: 0,
    isAddedToCart: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            const data = _.cloneDeep(action.payload);
            const defaultData = _.cloneDeep(initialState);
            state = { ...defaultData, ...data };
        },
        updateProduct: (state, action) => {
            const data = _.cloneDeep(action.payload);
            const defaultData = _.cloneDeep(initialState);
            state = { ...defaultData, ...data };
        },
        removeProduct: (state) => {
            state = _.cloneDeep(initialState);
        },
    }
});

export const { setProduct, removeProduct } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;